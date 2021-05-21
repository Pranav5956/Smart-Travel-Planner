import React, { useEffect, useState } from "react";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  getBlog,
  likeBlog,
  removeBlog,
  updateBlogWeights,
} from "../../requests/blogs";
import { useParams } from "react-router";
import Pusher from "pusher-js";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge,
  Jumbotron,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  FormGroup,
  Input,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import clsx from "clsx";
import { getItinerary } from "../../requests/itineraries";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/Auth";
import {
  FaCalendarAlt,
  FaEdit,
  FaHeart,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaUserAlt,
} from "react-icons/fa";
import { Element as ScrollElement, Link as ScrollLink } from "react-scroll";
import { CSSTransition, TransitionGroup } from "react-transition-group";

var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  cluster: "ap2",
});

const BlogDetails = () => {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const user = useSelector(selectUser);
  const [itinerary, setItinerary] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [editingComment, setEditingComment] = useState({ id: null, text: "" });
  const [newComment, setNewComment] = useState("");
  const [newCommentInfo, setNewCommentInfo] = useState({
    isOpen: false,
    message: "",
    status: "",
  });
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [hasSeenItinerary, setHasSeenItinerary] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getBlog(params.blogId);
      if (response.status === 200) {
        console.log(response.data);
        setBlog(response.data);

        const itineraryId = response.data.itinerary;
        const response2 = await getItinerary(itineraryId);
        setItinerary(response2.data.itinerary);
      }
    })();
  }, []);

  // Get realtime blog updates
  useEffect(() => {
    var channel = pusher.subscribe("smart-travel-planner");

    channel.bind("blogs-updated", async () => {
      const response = await getBlog(params.blogId);
      console.log(response.data);
      setBlog(response.data);
    });

    channel.bind("comments-updated", async () => {
      const response = await getAllComments(params.blogId);
      console.log(response.data);
      setBlog((blog) => ({ ...blog, comments: response.data }));
    });

    return () => {
      channel.unbind("blogs-updated");
      channel.unbind("comments-updated");
      channel.unsubscribe();
    };
  }, [blog]);

  const toggleDeleteModalIsOpen = () => {
    setDeleteModalIsOpen((deleteModalIsOpen) => !deleteModalIsOpen);
  };

  const getCountText = (list, suffix) => {
    const userHasLiked =
      list.filter((likedUser) => String(likedUser._id) === String(user._id))
        .length > 0;

    if (userHasLiked) {
      const othersLiked = list.length - 1;
      if (othersLiked === 0) return `You ${suffix}`;
      else return `You and ${list.length - 1} others ${suffix}`;
    }

    return `${list.length} people ${suffix}`;
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="blog__details">
      <Modal
        centered
        fade
        unmountOnClose
        isOpen={deleteModalIsOpen}
        toggle={toggleDeleteModalIsOpen}
        contentClassName="blog__details-deleteModal">
        <ModalHeader
          className="text-white bg-primary"
          toggle={toggleDeleteModalIsOpen}>
          Delete Blog?
        </ModalHeader>
        <ModalBody className="bg-white">
          <p className="text-center">
            Are you sure you want to delete this blog?
          </p>
          <div className="blog__details-deleteModal--buttons">
            <Button
              color="success"
              onClick={async () => {
                const response = await removeBlog(blog._id);
                if (response.status === 200) window.location.assign("/blogs");
              }}>
              Yes
            </Button>
            <Button color="danger" onClick={toggleDeleteModalIsOpen}>
              No
            </Button>
          </div>
          <small>
            Deleting a blog is an irreversible action. Please proceed at your
            own discretion.
          </small>
        </ModalBody>
      </Modal>
      {blog && (
        <div className="blog__details-container">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={clsx({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}>
                Blog Information
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={clsx({ active: activeTab === "2" })}
                onClick={async () => {
                  toggle("2");
                  if (!hasSeenItinerary) {
                    setHasSeenItinerary(true);
                    await updateBlogWeights(blog._id, 0.5);
                  }
                }}>
                Itinerary Information
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Jumbotron className="bg-light blog__details-jumbotron">
                <div className="blog__details-jumbotron--side">
                  <div className="plantrip__itinerary-thumbnail--cropper blog__details-thumbnail--cropper">
                    <img
                      src={blog.thumbnail}
                      {...(!blog.thumbnail ? { alt: blog.name } : {})}
                      width="250"
                      height="140"
                    />
                  </div>
                  <p className="mt-3 lead blog__details-jumbotron--sideCost">
                    <small>$</small>
                    {blog.cost}
                    <span className="mx-3 text-muted">|</span>
                    {blog.duration + 1} days
                  </p>
                  {user._id === blog.author._id && (
                    <>
                      <a
                        className="btn btn-success btn-block"
                        href={`/blogs/edit/${blog._id}`}>
                        Edit blog
                      </a>
                      <Button
                        className="btn btn-danger mt-3 btn-block"
                        onClick={() => {
                          setDeleteModalIsOpen(true);
                        }}>
                        Delete blog
                      </Button>
                    </>
                  )}
                </div>
                <div className="blog__details-jumbotron--main">
                  <h3 className="display-4">{blog.name}</h3>
                  <p className="">{blog.description}</p>
                  <div className="blog__details-jumbotron--info">
                    <p className="font-italic mt-2">
                      <span>Created {moment(blog.createdAt).fromNow()}.</span>
                      <span className="mx-2 text-muted">|</span>
                      <span>
                        Updated {moment(blog.blogUpdatedAt).fromNow()}.
                      </span>
                    </p>
                    <Button
                      outline={
                        !blog.likes.find(
                          (value) => String(value._id) === String(user._id)
                        )
                      }
                      title={getCountText(blog.likes, "have liked this blog!")}
                      color="danger"
                      onClick={async () => await likeBlog(blog._id)}>
                      {blog.likes.find(
                        (value) => String(value._id) === String(user._id)
                      ) ? (
                        <>
                          <FaHeart role="button" className="mr-2" />
                          Liked!
                        </>
                      ) : (
                        <>
                          <FaHeart role="button" className="mr-2" />
                          Like!
                        </>
                      )}
                    </Button>
                    <ScrollLink
                      to="blog-comments"
                      smooth={true}
                      duration={1000}>
                      <Button
                        color="primary"
                        title={getCountText(
                          blog.comments,
                          "have commented on this blog!"
                        )}>
                        View comments
                      </Button>
                    </ScrollLink>
                  </div>
                </div>
              </Jumbotron>
              <div className="blog__details-contents">
                {blog.contents.map((content) => (
                  <div
                    className={`blog__details-content--${content.contentType}`}
                    key={content._id}>
                    {content.contentType === "text" && (
                      <p className="blog__details-content--textContent">
                        {content.content}
                      </p>
                    )}
                    {content.contentType === "image" && (
                      <div className="blog__details-content--imageContent">
                        <img src={content.content} alt={content.caption} />
                        <small>{content.caption}</small>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <hr className="mx-5" />
              <ScrollElement name="blog-comments">
                <Container className="blog__details-comments--container mt-5">
                  <h4 className="mx-1 mb-3">Post a comment</h4>
                  <FormGroup>
                    <Input
                      type="textarea"
                      rows="4"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      style={{ resize: "none" }}
                      placeholder="Enter a new comment here."
                    />
                    <div className="blog__details-comments--createButtons my-3 ml-auto d-flex justify-content-end align-items-center">
                      <Alert
                        isOpen={newCommentInfo.isOpen}
                        color={newCommentInfo.status}>
                        {newCommentInfo.message}
                      </Alert>
                      <Button
                        color="success"
                        className="mx-1"
                        onClick={async () => {
                          if (newComment.length === 0) {
                            setNewCommentInfo({
                              isOpen: true,
                              message: "Enter a comment to post.",
                              status: "danger",
                            });
                            setTimeout(
                              () =>
                                setNewCommentInfo({
                                  isOpen: false,
                                  message: "",
                                  status: "",
                                }),
                              3000
                            );
                            return;
                          }

                          const response = await createComment(blog._id, {
                            text: newComment,
                          });
                          setNewComment("");
                          setNewCommentInfo({
                            isOpen: true,
                            message:
                              response.status === 200
                                ? "Comment posted!"
                                : "Comment could not be posted!",
                            status:
                              response.status === 200 ? "success" : "danger",
                          });
                          setTimeout(
                            () =>
                              setNewCommentInfo({
                                isOpen: false,
                                message: "",
                                status: "",
                              }),
                            3000
                          );
                        }}>
                        Post comment
                      </Button>
                      <Button
                        color="danger"
                        className="mx-1"
                        onClick={() => setNewComment("")}>
                        Clear comment
                      </Button>
                    </div>
                  </FormGroup>
                  <h4 className="mt-3 mb-3 mx-1">Comments</h4>
                  {blog.comments.length > 0 ? (
                    <ListGroup className="blog__details-comments">
                      <TransitionGroup>
                        {blog.comments.map(
                          ({
                            _id,
                            text,
                            createdAt,
                            updatedAt,
                            author: { username: authorName, _id: authorId },
                          }) => (
                            <CSSTransition
                              key={_id}
                              classNames="blog__details-comment-"
                              timeout={500}>
                              <ListGroupItem className="blog__details-comment">
                                <ListGroupItemHeading>
                                  <div className="blog__details-comment--headerMain">
                                    {authorName}
                                    <span></span>
                                    <small className="ml-2">
                                      commented {moment(createdAt).fromNow()}
                                    </small>
                                  </div>
                                  {user._id === authorId &&
                                    editingComment.id !== _id && (
                                      <div className="blog__details-comment--headerButtons">
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            setEditingComment({
                                              id: _id,
                                              text,
                                            });
                                          }}
                                          title="Edit comment">
                                          <FaEdit />
                                        </Button>
                                        <Button
                                          color="danger"
                                          onClick={async () =>
                                            await deleteComment(blog._id, _id)
                                          }
                                          title="Delete comment">
                                          <FaTrashAlt />
                                        </Button>
                                      </div>
                                    )}
                                </ListGroupItemHeading>
                                <ListGroupItemText className="mb-1">
                                  {editingComment.id === _id ? (
                                    <FormGroup className="blog__details-comment--content">
                                      <Input
                                        type="textarea"
                                        rows="4"
                                        value={editingComment.text}
                                        onChange={(e) =>
                                          setEditingComment(
                                            (editingComment) => ({
                                              ...editingComment,
                                              text: e.target.value,
                                            })
                                          )
                                        }
                                        style={{ resize: "none" }}
                                        placeholder="Enter your comment here."
                                      />
                                      <div className="blog__details-comment--contentButtons">
                                        <Button
                                          color="success"
                                          className="ml-auto"
                                          onClick={async () => {
                                            if (
                                              editingComment.text.length === 0
                                            )
                                              return;

                                            await editComment(blog._id, _id, {
                                              text: editingComment.text,
                                            });
                                            setEditingComment({
                                              id: null,
                                              text: "",
                                            });
                                          }}>
                                          Update comment
                                        </Button>
                                        <Button
                                          color="danger"
                                          onClick={() =>
                                            setEditingComment({
                                              id: null,
                                              text: "",
                                            })
                                          }>
                                          Discard changes
                                        </Button>
                                      </div>
                                    </FormGroup>
                                  ) : (
                                    <p className="blog__details-comment--content mb-1">
                                      {text}
                                    </p>
                                  )}
                                </ListGroupItemText>
                                {moment(updatedAt).diff(moment(createdAt)) >
                                  0 && (
                                  <small className="font-italic text-right d-block">
                                    Last edited {moment(updatedAt).fromNow()}
                                  </small>
                                )}
                              </ListGroupItem>
                            </CSSTransition>
                          )
                        )}
                      </TransitionGroup>
                    </ListGroup>
                  ) : (
                    <div className="blog__Details-comments--info">
                      There are no comments for this blog!
                    </div>
                  )}
                </Container>
              </ScrollElement>
            </TabPane>
            <TabPane tabId="2">
              {itinerary && (
                <>
                  <div className="itinerary__main-itinerary--info">
                    <h4 className="itinerary__main-itineraryName">
                      {itinerary.name}
                    </h4>
                    <div className="itinerary__main-itineraryExtras">
                      <div className="itinerary__main-itineraryTimestamps">
                        <p className="itinerary__main-createdAt">
                          Created on
                          {moment(itinerary.createdAt).format(
                            " MMMM Do, YYYY HH:mm:ss A"
                          )}
                        </p>
                        <p className="itinerary__main-updatedAt">
                          Last updated on
                          {moment(itinerary.updatedAt).format(
                            " MMMM Do, YYYY HH:mm:ss A"
                          )}
                        </p>
                      </div>
                      {itinerary.author === user._id && (
                        <div className="itinerary__main-itineraryButtons">
                          <a
                            color="primary"
                            className="mr-3 btn btn-primary"
                            href={`/plantrip/${itinerary._id}`}>
                            Edit Itinerary
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="itinerary__main-stops">
                    {itinerary.route.map((stop, index) => (
                      <div className="itinerary__main-stop" key={stop._id}>
                        <h5 className="itinerary__main-stop--name">
                          <FaMapMarkerAlt
                            className="mr-2"
                            color={
                              index === 0
                                ? "green"
                                : index === itinerary.route.length - 1
                                ? "red"
                                : "orange"
                            }
                          />
                          {stop.name}
                        </h5>
                        {index !== itinerary?.route.length - 1 && (
                          <div className="itinerary__main-stopMarker"></div>
                        )}
                        <div className="itinerary__main-hotels">
                          {itinerary.hotels.filter(
                            (hotel) => hotel.stopName === stop.name
                          ).length > 0 &&
                            itinerary.hotels
                              .filter((hotel) => hotel.stopName === stop.name)
                              .map((hotel, index) => (
                                <div
                                  className="itinerary__main-hotel ml-5"
                                  key={`hotel-${index}`}>
                                  <div className="plantrip__itinerary-thumbnail--cropper">
                                    <img
                                      src={
                                        hotel.thumbnail ||
                                        "https://static.wikia.nocookie.net/awakening-of-the-rebellion/images/c/c4/Missing_Image.jpg/revision/latest?cb=20200516103417"
                                      }
                                      {...(!hotel.thumbnail
                                        ? { alt: hotel.name }
                                        : {})}
                                      width="250"
                                      height="140"
                                    />
                                  </div>
                                  <div className="itinerary__main-info">
                                    <h6 className="itinerary__main-name">
                                      {hotel.name}
                                    </h6>
                                    <p className="itinerary__main-address text-muted">
                                      {hotel.address}
                                    </p>
                                    <div className="itinerary__main-hotelInfo">
                                      <p className="d-flex align-items-center">
                                        <FaCalendarAlt
                                          style={{ color: "#007bff" }}
                                          className="mr-2"
                                          aria-hidden="true"
                                          title="Check-In Date"
                                        />
                                        {moment
                                          .unix(hotel.checkin_date)
                                          .format("YYYY-MM-DD")}
                                        <span className="mx-2">-</span>
                                        <FaCalendarAlt
                                          style={{ color: "#007bff" }}
                                          className="mr-2"
                                          aria-hidden="true"
                                          title="Check-Out Date"
                                        />
                                        {moment
                                          .unix(hotel.checkout_date)
                                          .format("YYYY-MM-DD")}
                                      </p>
                                      <p className="d-flex align-items-center">
                                        <FaUserAlt
                                          style={{ color: "#007bff" }}
                                          className="mr-2"
                                          aria-hidden="true"
                                          title="Adults Count"
                                        />
                                        {hotel.adults_number}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                        </div>
                        <div className="itinerary__main-places ml-5">
                          {itinerary.POI.filter(
                            (poi) => poi.stopName === stop.name
                          ).length > 0 &&
                            itinerary.POI.filter(
                              (poi) => poi.stopName === stop.name
                            ).map((place, index) => (
                              <div
                                className="itinerary__main-place"
                                key={`place-${index}`}>
                                <div className="plantrip__itinerary-thumbnail--cropper">
                                  <img
                                    src={
                                      place.thumbnail ||
                                      "https://static.wikia.nocookie.net/awakening-of-the-rebellion/images/c/c4/Missing_Image.jpg/revision/latest?cb=20200516103417"
                                    }
                                    {...(!place.thumbnail
                                      ? { alt: place.name }
                                      : {})}
                                    width="250"
                                    height="140"
                                  />
                                </div>
                                <div className="itinerary__main-info">
                                  <h6 className="itinerary__main-name">
                                    {place.name}
                                  </h6>
                                  <div className="itinerary__main-tags">
                                    {place.kinds
                                      .split(",")
                                      .map((tag, index) => (
                                        <Badge
                                          pill
                                          className="mr-1"
                                          color="primary"
                                          key={`tag-${index}`}>
                                          {tag.replace("_", " ")}
                                        </Badge>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </TabPane>
          </TabContent>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
