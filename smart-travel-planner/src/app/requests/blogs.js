import axios from "../axios";

export const getUserBlogs = () => {
  return axios.get("/blogs/user");
};

export const getOtherBlogs = () => {
  return axios.get("/blogs/others");
};

export const getOtherRecommendedBlogs = () => {
  return axios.get("/blogs/others/recommended");
};

export const getBlog = (blogId) => {
  return axios.get(`/blogs/${blogId}`);
};

export const createBlog = (blog) => {
  return axios.post(`/blogs`, blog);
};

export const updateBlog = (blogId, blog) => {
  return axios.put(`/blogs/${blogId}`, blog);
};

export const removeBlog = (blogId) => {
  return axios.delete(`/blogs/${blogId}`);
};

export const updateBlogWeights = (blogId, weight) => {
  return axios.post(`/blogs/weights/${blogId}`, weight);
};

export const likeBlog = (blogId) => {
  return axios.post(`/blogs/${blogId}/like`);
};

export const getAllComments = (blogId) => {
  return axios.get(`/blogs/${blogId}/comments`);
};

export const createComment = (blogId, comment) => {
  return axios.post(`/blogs/${blogId}/comments`, comment);
};

export const editComment = (blogId, commentId, comment) => {
  return axios.put(`/blogs/${blogId}/comments/${commentId}`, comment);
};

export const deleteComment = (blogId, commentId) => {
  return axios.delete(`/blogs/${blogId}/comments/${commentId}`);
};
