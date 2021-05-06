var mongoose = require("mongoose")

var userProfileSchema = new mongoose.Schema({
    username : String,
    hotels : [
        {
            hotelId : String,
            cityId : String,
            level : Number,
            timestamp : Number,
            amenity_ids : [String],
            theme_ids : [String],
            evaluated : Boolean
        }
    ],
    POI : [
        {
            xid : String,
            level : Number,
            timestamp : Number,
            categories : [String]
        }
    ],
    blogs : [
        {
            blogId : {type: mongoose.Schema.Types.ObjectId, ref: "Blog"},
            level : Number,
            timestamp : Number,
            evaluated : Boolean
        }
    ],
    interestVector :{
        stars : Number,
        price : Number,
        guestReview : Number,
        amenities : [Number],
        themes : [Number],
        accessibility : [Number],
        facilityFilters : [String],
        themeFilters : [String]
    },
    POIcategories : [],
    blogInterest : {
        cost : Number,
        duration : Number,
        likes : Number
    }
})

module.exports = mongoose.model("UserProfile", userProfileSchema);

