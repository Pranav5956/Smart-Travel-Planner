import React, { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  createBlog,
  getUserBlogs,
  getOtherBlogs,
  likeBlog,
  updateBlogWeights,
  getOtherRecommendedBlogs,
} from "../../requests/blogs";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import FilterResults from "react-filter-search";
import {
  FaComment,
  FaDollarSign,
  FaHeart,
  FaRegHeart,
  FaSearch,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/Auth";
import CustomInput from "../CustomInput";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { getAllItineraries } from "../../requests/itineraries";

const createBlogSchema = Yup.object().shape({
  name: Yup.string()
    .min(15, "Blog name should not be less than 20 characters!")
    .max(50, "Blog name should not be more than 50 characters!")
    .required("Blog name is required!"),
  itinerary: Yup.string()
    .test((value) => value !== "--Choose Itinerary ID--")
    .required("Choose an itinerary to link!"),
  description: Yup.string()
    .min(50, "Description should not be less than 50 characters!")
    .max(600, "Description should not be more than 600 characters!"),
  thumbnail: Yup.string().trim().url("Please provide a valid image url!"),
  cost: Yup.number().required("Cost is required!"),
  duration: Yup.number().required("Duration is required!"),
});

var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: "ap2",
});

const BlogDisplay = () => {
  const [userBlogs, setUserBlogs] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [createBlogModalIsOpen, setCreateBlogModalIsOpen] = useState(false);
  const [itineraries, setItineraries] = useState(null);
  const [isRecommended, setIsRecommended] = useState(false);
  const history = useHistory();

  const user = useSelector(selectUser);

  const getCountText = (list, suffix) => {
    const userHasLiked =
      list.filter((id) => String(id) === String(user._id)).length > 0;

    if (userHasLiked) {
      const othersLiked = list.length - 1;
      if (othersLiked === 0) return `You ${suffix}`;
      else return `You and ${list.length - 1} others ${suffix}`;
    }

    return `${list.length} people ${suffix}`;
  };

  useEffect(() => {
    (async () => {
      const userBlogs = await getUserBlogs();
      const otherBlogs = await getOtherBlogs();
      const itineraries = await getAllItineraries();
      setUserBlogs(userBlogs.data);
      setOtherBlogs(otherBlogs.data);
      setItineraries(
        itineraries.data.itineraries.filter(
          (itinerary) => itinerary.author === user._id
        )
      );
    })();
  }, []);

  useEffect(() => {
    var channel = pusher.subscribe("smart-travel-planner");

    channel.bind("blogs-updated", async () => {
      let otherBlogs;
      if (isRecommended) otherBlogs = await getOtherRecommendedBlogs();
      else otherBlogs = await getOtherBlogs();
      console.log(otherBlogs);
      setOtherBlogs(otherBlogs.data);
    });

    return () => {
      channel.unbind("blogs-updated");
      channel.unsubscribe();
    };
  }, [otherBlogs]);

  useEffect(() => {
    (async () => {
      let otherBlogs;
      if (isRecommended) otherBlogs = await getOtherRecommendedBlogs();
      else otherBlogs = await getOtherBlogs();
      console.log(otherBlogs);
      setOtherBlogs(otherBlogs.data);
    })();
  }, [isRecommended]);

  const toggleCreateBlogModal = () =>
    setCreateBlogModalIsOpen((createBlogModalIsOpen) => !createBlogModalIsOpen);

  const onSubmitCreateBlog = async (blogInfo) => {
    const response = await createBlog(blogInfo);

    if (response.status === 200)
      history.push(`/blogs/edit/${response.data.blogId}`);
  };

  return (
    <div className="blogs">
      <Modal
        isOpen={createBlogModalIsOpen}
        toggle={toggleCreateBlogModal}
        centered
        fade
        unmountOnClose
        className="create-new-blog">
        <ModalHeader
          toggle={toggleCreateBlogModal}
          className="bg-primary text-white">
          Create new blog
        </ModalHeader>
        <ModalBody>
          <h3 className="create-new-blog-header">Blog Details</h3>
          <Formik
            initialValues={{
              name: `Untitled Blog ${(userBlogs && userBlogs.length + 1) || 1}`,
              description: "",
              thumbnail: "",
              cost: 0,
              duration: 1,
            }}
            validationSchema={createBlogSchema}
            onSubmit={onSubmitCreateBlog}>
            <Form className="p-3">
              <Row>
                <Col xs={8}>
                  <FormGroup>
                    <Field
                      placeholder="Enter blog name"
                      name="name"
                      component={CustomInput}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Field
                      placeholder="Choose itinerary"
                      name="itinerary"
                      type="select"
                      component={CustomInput}
                      options={
                        itineraries &&
                        [
                          {
                            _id: "--Choose Itinerary ID--",
                            name: "--Choose Itinerary ID--",
                          },
                          ...itineraries,
                        ].map((itinerary) => (
                          <option title={itinerary.name}>
                            {itinerary._id}
                          </option>
                        ))
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Field
                  placeholder="Enter blog description in less than 600 characters"
                  name="description"
                  type="textarea"
                  rows={6}
                  component={CustomInput}
                  style={{ resize: "none" }}
                />
              </FormGroup>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <Field
                      placeholder="Enter thumbnail image url"
                      name="thumbnail"
                      component={CustomInput}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <InputGroup>
                      <Field
                        placeholder="Cost"
                        type="number"
                        min={0}
                        name="cost"
                        component={CustomInput}
                        prependFieldIcon={<FaDollarSign />}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <InputGroup>
                      <Field
                        placeholder="Days"
                        type="number"
                        min={1}
                        name="duration"
                        component={CustomInput}
                        appendFieldIcon={"Days"}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Button
                  color="success"
                  size="lg"
                  type="submit"
                  className="mr-5 px-5">
                  Create blog
                </Button>
                <Button
                  color="danger"
                  size="lg"
                  onClick={toggleCreateBlogModal}
                  className="px-5">
                  Discard blog
                </Button>
              </div>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
      <div className="blogs__display">
        <div className="blogs__display-sidebar">
          <div className="blogs__display-sidebar--header">
            <h3>My Blogs</h3>
          </div>
          <FormGroup className="blogs__display-sidebar--search">
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs"
            />
            <FaSearch aria-hidden={true} />
          </FormGroup>
          {userBlogs && (
            <FilterResults
              value={searchQuery}
              data={userBlogs.map((blog) => ({
                _id: blog._id,
                name: blog.name,
                createdAt: blog.createdAt,
              }))}
              renderResults={(results) => (
                <ListGroup className="blogs__display-sidebar--blogs">
                  {results && results.length > 0 ? (
                    results.map((blog) => (
                      <Link
                        to={`/blogs/view/${blog._id}`}
                        style={{ textDecoration: "none" }}
                        key={blog._id}>
                        <ListGroupItem
                          className="blogs__display-sidebar--blog"
                          title={blog.name}>
                          <ListGroupItemHeading className="blogs__display-sidebar--blogname">
                            {blog.name}
                          </ListGroupItemHeading>
                          <ListGroupItemText className="blogs__display-sidebar--createdAt">
                            Created {moment(blog.createdAt).fromNow()}
                          </ListGroupItemText>
                        </ListGroupItem>
                      </Link>
                    ))
                  ) : (
                    <div className="blogs__display-sidebar--blogsEmpty">
                      Couldn't find the blog(s) you are looking for! Try
                      checking your search query or create a new blog.
                    </div>
                  )}
                </ListGroup>
              )}
            />
          )}
          <Button
            color="success"
            onClick={() => setCreateBlogModalIsOpen(true)}
            className="blogs__display-sidebar--newBlog">
            Create a new blog
          </Button>
        </div>
        <div className="blogs__display-main">
          <Jumbotron>
            <h2 className="display-4">Welcome to the Blogs Section!</h2>
            <p className="lead ml-1">
              Largest collection of travel plans and itinerary blogs ever. View
              other's blogs or start by creating your very own blog!
            </p>
            <Button
              color="primary mr-2"
              onClick={() => setIsRecommended(false)}>
              Recent blogs
            </Button>
            <Button color="danger" onClick={() => setIsRecommended(true)}>
              Recommended blogs
            </Button>
          </Jumbotron>
          <div className="blogs__display-main--filters"></div>
          <div className="blogs__display-main--blogs">
            {otherBlogs &&
              otherBlogs.map((blog) => (
                <Card className="blogs__display-main--blog mb-4" key={blog._id}>
                  <CardHeader>
                    <h4 className="blogs__display-main--blogAuthor mb-0">
                      {blog.authorName}
                    </h4>
                    <small className="blogs__display-main--blogCreatedAt mb-0 font-italic">
                      uploaded {moment(blog.createdAt).fromNow()}
                    </small>
                  </CardHeader>
                  <div className="blogs__display-main--blogThumbnail">
                    <img width="100%" src={blog.thumbnail} alt={blog.name} />
                  </div>
                  <CardBody className="blogs__display-main--blogInfo">
                    <h5
                      className="blogs__display-main--blogName mb-0"
                      title={blog.name}>
                      {blog.name}
                    </h5>
                    <div className="blogs__display-main--blogMetrics">
                      <div className="blogs__display-main--blogCostAndDuration">
                        <p className="blogs__display-main--blogCost mb-3">
                          <span>$</span>
                          {blog.cost}
                        </p>
                        <p className="blogs__display-main--blogDuration">
                          {blog.duration + 1} Days
                        </p>
                      </div>
                      <div className="blogs__display-main--blogLikesAndComments">
                        <div
                          className="blogs__display-main--blogLikes"
                          title={getCountText(
                            blog.likes,
                            "have liked this blog!"
                          )}>
                          {blog.likes.find(
                            (value) => String(value) === String(user._id)
                          ) ? (
                            <FaHeart
                              role="button"
                              onClick={() => likeBlog(blog._id)}
                            />
                          ) : (
                            <FaRegHeart
                              role="button"
                              onClick={() => likeBlog(blog._id)}
                            />
                          )}
                          <p className="mb-1">{blog.likes.length} Like(s)</p>
                        </div>
                        <div
                          className="blogs__display-main--blogComments"
                          title={getCountText(
                            blog.comments,
                            "have commented on this blog!"
                          )}>
                          <FaComment />
                          <p className="mb-0">
                            {blog.comments.length} Comment(s)
                          </p>
                        </div>
                      </div>
                    </div>
                    <a
                      className="btn btn-success align-self-end w-100 p-2"
                      href={`/blogs/view/${blog._id}`}
                      onClick={async () =>
                        await updateBlogWeights(blog._id, 0.3)
                      }>
                      View Blog
                    </a>
                  </CardBody>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDisplay;
