import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getBlog, updateBlog } from "../../requests/blogs";
import CustomInput from "../CustomInput";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  InputGroup,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/Auth";
import moment from "moment";
import {
  FaArrowCircleUp,
  FaArrowDown,
  FaArrowUp,
  FaDollarSign,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";

const editBlogSchema = Yup.object().shape({
  name: Yup.string()
    .min(15, "Blog name should not be less than 20 characters!")
    .max(50, "Blog name should not be more than 50 characters!")
    .required("Blog name is required!"),
  description: Yup.string()
    .min(50, "Description should not be less than 50 characters!")
    .max(600, "Description should not be more than 600 characters!"),
  thumbnail: Yup.string().trim().url("Please provide a valid image url!"),
  cost: Yup.number().required("Cost is required!"),
  duration: Yup.number().required("Duration is required!"),
});

const BlogEdit = () => {
  const params = useParams();
  const history = useHistory();

  const [blogToEdit, setBlogToEdit] = useState(null);
  const [blogContent, setBlogContent] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getBlog(params.blogId);
      console.log(response.data);
      setBlogToEdit(response.data);
      setBlogContent(response.data.contents);
    })();
  }, []);

  const onSubmitEditBlog = async (values) => {
    console.log(values, blogContent);
    const filteredContent = blogContent.filter(
      (content) => content.content.length > 0
    );
    const response = await updateBlog(blogToEdit._id, {
      ...values,
      contents: filteredContent,
    });

    if (response.status === 200) history.push(`/blogs/view/${blogToEdit._id}`);
  };

  const addContent = (type, index) => {
    setBlogContent((blogContent) => [
      ...blogContent.slice(0, index + 1),
      { content: "", contentType: type },
      ...blogContent.slice(index + 1),
    ]);
  };

  const removeContent = (index) => {
    const updatedBlogContent = [
      ...blogContent.slice(0, index),
      ...blogContent.slice(index + 1),
    ];
    setBlogContent(updatedBlogContent);
  };

  const updateContent = (index, content, caption) => {
    if (caption)
      setBlogContent([
        ...blogContent.slice(0, index),
        { ...blogContent[index], caption: content },
        ...blogContent.slice(index + 1),
      ]);
    else
      setBlogContent([
        ...blogContent.slice(0, index),
        { ...blogContent[index], content },
        ...blogContent.slice(index + 1),
      ]);
  };

  const moveContent = (indexFrom, indexTo) => {
    setBlogContent((blogContent) => {
      let data = [...blogContent];
      let temp = data[indexFrom];
      data[indexFrom] = data[indexTo];
      data[indexTo] = temp;
      return data;
    });
  };

  return (
    <div className="blog__edit">
      {blogToEdit && (
        <Formik
          initialValues={{
            name: blogToEdit.name,
            description: blogToEdit.description,
            thumbnail: blogToEdit.thumbnail,
            cost: blogToEdit.cost,
            duration: blogToEdit.duration,
          }}
          validationSchema={editBlogSchema}
          onSubmit={onSubmitEditBlog}>
          <Form>
            <h2 className="blog__edit-title mt-3">Blog Information</h2>
            <div className="blog__edit-container">
              <div className="blog__edit-thumbnailContainer">
                <h4>{blogToEdit.author.username}'s Blog</h4>
                <div className="blog__edit-timestamps">
                  <small>
                    Created {moment(blogToEdit.createdAt).fromNow()}
                  </small>
                  <small>
                    Updated {moment(blogToEdit.updatedAt).fromNow()}
                  </small>
                </div>
                <div className="blog__edit-thumbnail">
                  <img src={blogToEdit.thumbnail} alt={blogToEdit.name} />
                </div>
                <FormGroup>
                  <Field
                    placeholder="Enter blog thumbnail"
                    name="thumbnail"
                    component={CustomInput}
                  />
                </FormGroup>
              </div>
              <div className="blog__edit-infoContainer">
                <FormGroup>
                  <Field
                    placeholder="Enter blog name"
                    name="name"
                    component={CustomInput}
                    bsSize="lg"
                  />
                </FormGroup>
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
                  <Col xs={4}>
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
                  <Col xs={4}>
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
                <Button color="success" type="submit" className="mt-2 mr-3">
                  Save changes
                </Button>
                <Button color="danger" className="mt-2">
                  Discard changes
                </Button>
              </div>
            </div>
            <div className="blog__edit-container--contents">
              <h4 className="blog__edit-container--contentsHeader">
                Blog Contents
              </h4>
              <div className="blog__edit-contents">
                {blogContent &&
                  blogContent.length > 0 &&
                  blogContent.map(
                    ({ content, contentType, caption }, index) => (
                      <div
                        className="blog__edit-content"
                        key={`content-${index}`}>
                        {contentType === "text" ? (
                          <div className="blog__edit-content--text">
                            <Input
                              type="textarea"
                              placeholder="This is the space for your content..."
                              onChange={(e) =>
                                updateContent(index, e.target.value)
                              }
                              value={content}
                              rows={8}
                              style={{ resize: "none" }}
                            />
                          </div>
                        ) : (
                          <div className="blog__edit-content--image">
                            <img
                              className="blog__edit-content--img"
                              src={content}
                              alt={content}
                            />
                            <Input
                              placeholder="Enter image url"
                              onChange={(e) =>
                                updateContent(index, e.target.value)
                              }
                              value={content}
                              className="mb-3"
                            />
                            <Input
                              placeholder="Enter image caption"
                              className="w-100"
                              onChange={(e) =>
                                updateContent(index, e.target.value, true)
                              }
                              value={caption || ""}
                            />
                          </div>
                        )}
                        <div className="blog__edit-buttons">
                          <UncontrolledButtonDropdown title="Add content after">
                            <DropdownToggle caret color="primary">
                              <FaPlus />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={() => addContent("text", index)}>
                                Text
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => addContent("image", index)}>
                                Image
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                          <Button
                            title="Remove Content"
                            color="danger"
                            onClick={() => removeContent(index)}
                            className="mt-2">
                            <FaTrashAlt />
                          </Button>
                          {index !== 0 && (
                            <Button
                              title="Move content up"
                              color="secondary"
                              onClick={() => moveContent(index, index - 1)}
                              className="mt-2">
                              <FaArrowUp />
                            </Button>
                          )}
                          {index !== blogContent.length - 1 && (
                            <Button
                              title="Move content down"
                              color="secondary"
                              onClick={() => moveContent(index, index + 1)}
                              className="mt-2">
                              <FaArrowDown />
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  )}
                {blogContent && blogContent.length === 0 && (
                  <UncontrolledButtonDropdown
                    className="w-25 mx-auto mt-3"
                    direction="down">
                    <DropdownToggle caret color="primary">
                      <FaPlus /> Add Content
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => addContent("text", 0)}>
                        Text
                      </DropdownItem>
                      <DropdownItem onClick={() => addContent("image", 0)}>
                        Image
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                )}
              </div>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default BlogEdit;
