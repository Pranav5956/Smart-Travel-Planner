import React from "react";
import { useParams } from "react-router";

const BlogDetails = () => {
  const { blogId } = useParams();

  return <div className="blog__details">{blogId}</div>;
};

export default BlogDetails;
