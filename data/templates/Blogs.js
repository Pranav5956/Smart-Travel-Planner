const MonkeyLearn = require('monkeylearn')
var mongoose = require("mongoose")
const scaler = require('minmaxscaler');
const cosine_similarity = require( 'compute-cosine-similarity' );
var UserProfile = require("../models/userProfile.js");
var Blog = require("../models/blog.js");
var POImap = require("../Data/POImap.js");

var databaseUri ="mongodb+srv://admin:Password@2002@cluster0.i4sv9.mongodb.net/RoadTrip?retryWrites=true&w=majority"
mongoose.connect(databaseUri, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`));


// ENV variables
const mlAPI = '7f1ef873b98fe8086c234058159ac2f5154919ef'
const modelId = 'cl_pi3C7JiL'

function classifyComment(comment){
    const ml = new MonkeyLearn(mlAPI)
    return new Promise(function(resolve,reject){
        ml.classifiers.classify(modelId, [comment]).then(res => {
            if(res.body[0].error) 
                reject(res.body[0].error_detail)
            else{
                var result = {
                    category : res.body[0].classifications[0].tag_name,
                    weight : res.body[0].classifications[0].confidence
                }
                if(result.category=="Negative") result.weight = ((1-result.weight)/2)
                else result.weight = ((1+result.weight)/2)
                resolve(result)
            } 
        })
    })
}

// CALLABLE - calls classifyComment() 
async function getSentiment(comment){
    var sentiment = await classifyComment(comment)
    return sentiment
}


// CALLABLE - execute when respective interactions are triggered
async function updateWeight(blogId,userId,level){
    var profile = await UserProfile.findOne({_id : userId},function(err,doc){
        profile = doc
    })
    var flag = 0
    profile["blogs"].forEach(blog => {
        if(blog["blogId"]==blogId){ 
            flag = 1
            blog["level"] = level
            blog["timestamp"] = Math.round(new Date().getTime()/1000)
            blog["evaluated"] = 0
        }
    })
    if(flag==0){
        profile["blogs"].push({
            blogId : blogId,
            level : level,
            timestamp : Math.round(new Date().getTime()/1000),
            evaluated : 0
        })
    }
    profile.save(function(err,result){
        if(err) throw err
        else console.log("User Profile Updated")
    })
}


function weightedAverage(blogInterest,bVecs,feature,weights,count){
    var weightedSum = blogInterest[feature]*count 
    bVecs.forEach(function(bVec,index){
        weightedSum += bVec[feature]*weights[index]
        count += 1
    })
    return (weightedSum/count).toFixed(3)
}

// CALLABLE - to be executed on login
async function updateBlogInterest(userId){
    
    var profile, blogInterest, blogs, count = 0
    var timeWeight = [], blogIds = [], levelWeight = [], bVecs = []
    
    profile = await UserProfile.findOne({_id : userId},function(err,doc){
        profile = doc
    })
    
    blogInterest = profile["blogInterest"]
    
    await profile["blogs"].forEach(blog => {
        if(blog["evaluated"]==0){
            timeWeight.push(blog["timestamp"])
            blogIds.push(blog["blogId"])
            levelWeight.push(blog["level"])
        } 
        else count += 1
    })
    
    if(timeWeight.length == 1 ) timeWeight = [1]
    else timeWeight = scaler.fit_transform(timeWeight, max_ = 0.9, min_ = 0.1);

    function Multiply(a,b){
        return a.map((e,i) => parseFloat((e * b[i]).toFixed(3)))
    }
    var weights = Multiply(timeWeight, levelWeight)

    // is order maintained?
    blogs = await Blog.find({_id: { $in: blogIds} }, function(err, docs){ 
        blogs = docs
    });

    blogs.forEach(blog => {
        bVecs.push({
            cost : blog.cost,
            duration : blog.duration,
            likes : blog.likes.length
        })
    })

    var features = ["cost","duration","likes"]
    features.forEach(feature => {
        blogInterest[feature] = weightedAverage(blogInterest,bVecs,feature,weights,count)
    })

    await UserProfile.updateMany({'blogs.blogId': { $in: blogIds} },{
        '$set' : {
            'blogs.$[].evaluated' : true
        }
    }, function(){console.log("Status Updated")});

    await UserProfile.updateOne({_id : userId}, 
        {blogInterest : blogInterest},
        function(){console.log("Blog Interest Updated")}
    );
}

async function Primary(items,N){
    
    var similarUsers = []
    items.slice(1,N+1).forEach(item => {
        similarUsers.push(item[0])
    })
    
    var blogObj, recBlogs = []

    blogObj = await UserProfile.find({_id: {$in : similarUsers}},{blogs :1, blogsPosted : 1},function(err,docs){
        blogObj = docs
    })

    blogObj.forEach(obj => {
        obj["blogs"].forEach(blog => {
            recBlogs.push({
                blogId : blog.blogId,
                weight : blog.level
            })
        })
    })

    blogObj.forEach(obj => {
        obj["blogsPosted"].forEach(blog => {
            recBlogs.push({
                blogId : blog,
                weight : 1
            })
        })
    })

    recBlogs.sort(function(b1, b2){
        return b2.weight - b1.weight
    })

    return recBlogs
}

// display blogs with highest likes
async function Secondary(){
    var blogs, recBlogs = []
    blogs = await Blog.find({},{_id : 1, likes : 1},function (err,docs){
        blogs = docs
    })
    blogs.sort(function(b1, b2){
        return b2.likes.length - b1.likes.length
    })
    blogs.forEach(blog => {
        recBlogs.push({blogId : blog["_id"]})
    })
    return recBlogs
}

// returns a vector of 40 features
function vectorize(profile){

    var iVec = profile.interestVector
    var POIvec = profile.POIcategories
    var blogInterest = profile.blogInterest

    var vector = []
    vector.push(iVec["stars"],iVec["price"],iVec["guestReview"])
    var hotelFeatures = ["amenities","themes","accessibility"]
    hotelFeatures.forEach(feature => {
        vector = vector.concat(iVec[feature])
    })
    
    POIvec.sort(function(p1, p2){return p2-p1})
    vector = vector.concat(POIvec)

    var blogFeatures = ["cost","duration","likes"]
    blogFeatures.forEach(feature => {
        vector.push(blogInterest[feature])
    })
    return vector
}

// CALLABLE - returns a list of blog IDs
async function recommendBlogs(userId){
    
    var targetProfile, simScores = {}, N = 5, threshold = 0.80, recommended
    var requiredFields = {interestVector : 1, POIcategories : 1, blogInterest : 1}

    targetProfile = await UserProfile.findOne({_id : userId},requiredFields,function(err,docs){
        targetProfile = docs
    })

    profiles = await UserProfile.find({},requiredFields,function(err,docs){
        profiles = docs
    })

    if(profiles.length < N){
        console.log("Resorting to Secondary recommender")
        recommended = await Secondary() 
    }
    else{
        var userVector = vectorize(targetProfile)

        profiles.forEach(profile => {
            var id = profile["_id"]
            var vec = vectorize(profile)
            simScores[id] = cosine_similarity(userVector,vec)
        })
        var items = Object.keys(simScores).map(function(key) {
            return [key, simScores[key]];
        });
        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        if(items[1]<threshold){
            console.log("Resorting to Secondary recommender")
            recommended = await Secondary()
        }
        else{
            console.log("Using Primary recommender")
            recommended = await Primary(items,N)
        } 
    }   
    console.log(recommended)
}


/* ---------------------------------------------------------------------------------------------------*/

// HELPER FUNCTION FOR TESTING PURPOSES
function createBlog(blogname,likes,comments,cost,dur){
    var likesarr = [], commentsarr = []
    for(var i=0;i<likes;i++) likesarr.push("user" + String(i))
    for(var i=0;i<comments;i++) commentsarr.push("comment" + String(i))
    Blog.create({
        likes: likesarr,
        name: blogname,
        description: "This is Test Blog",
        cost : cost,
        duration : dur,
        thumbnail: "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/77/61/77615_v3.jpeg",
        contents: [
            {
                contentType: "text",
                content: "lorem ipsum filler content"
            },
            {
                contentType: "image",
                content: "https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/77/61/77615_v3.jpeg"
            }
        ],
        comments: commentsarr
    },function(err,instance){
        console.log("Created Blog")
    })
}

// HELPER FUNCTION FOR TESTING PURPOSES
function createUser(username){
    UserProfile.create({
                username : username,
                hotels : [],
                POI : [],
                blogs : [],
                interestVector : {
                    stars : 0,
                    price : 0,
                    guestReview : 0,
                    amenities : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    themes : [0,0,0,0,0,0],
                    accessibility : [0,0,0,0,0,0,0,0],
                    facilityFilters : [],
                    themeFilters : []
                },
                POIcategories : [],
                blogInterest : {
                    cost : 0,
                    duration : 0,
                    likes : 0
                }

            },function(err,instance){
                console.log("Created user")
    })
}

/*-----------------------------------------------------------------------------------------------------*/ 


// CALLING FUNCTIONS FOR TESTING PURPOSES

// createBlog("MyBlog4",20,20,35000,4)

// createUser("userx")

// updateBlogInterest("60950bfab418810f3449f8cc")

// updateWeight("60a629a436767248e02c8df6","60950bfab418810f3449f8cc",0.85)

// recommendBlogs("60950bfab418810f3449f8cc")

// getSentiment("this was a great blog")



/*--------------------------------------------------------------------------------------------------------*/

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });


