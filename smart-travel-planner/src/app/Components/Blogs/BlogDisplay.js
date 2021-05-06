import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get("/blogs", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setBlogs(response.data);
    };
    getBlogs();
  }, []);

  const history = useHistory();

  const onClickBlog = (id) => {
    history.push(`/blogs/${id}`);
  };

  return (
    <div className="blog__display">
      <div className="blog__display-sidebar"></div>
      <div className="blog__display-main">
        <div className="blog__display-grid">
          <div className="blog__display-gridCell">
            <h4>Featured Blog</h4>
            <div className="blog__display-blogBig blog-box">
              {blogs[0] && (
                <>
                  {blogs.length && (
                    <img src={blogs[0].thumbnail} alt="nothing" />
                  )}
                </>
              )}
            </div>
          </div>
          <div className="blog__display-gridCell">
            <h4>Top Blogs</h4>
            <div className="blog__display-gridCell--cell">
              <div className="blog__display-blogSmall blog-box"></div>
              <div className="blog__display-blogSmall blog-box"></div>
              <div className="blog__display-blogSmall blog-box"></div>
              <div className="blog__display-blogSmall blog-box"></div>
            </div>
          </div>
        </div>
        <div className="blog__display-others">
          <h4>Other Blogs</h4>
          <div className="blog__display-others--grid">
            {blogs.map((blog, index) => (
              <div
                className="blog__display-blogSmaller blog-box"
                key={`blog-${index}`}
                onClick={() => onClickBlog(blog.id)}>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src={blog.thumbnail}
                    alt={blog.name}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{blog.name}</CardTitle>
                    <CardText tag="h6" className="mb-2 text-muted">
                      {blog.description}
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDisplay;
