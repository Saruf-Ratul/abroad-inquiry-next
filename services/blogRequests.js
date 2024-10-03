import axios from "axios";
import { api, BASE_URL } from "./apis";

/**
 * Get blog lists
 * @memberof module:api/request
 * @param {Number} page 
 * @returns {Object}
 */
export const GET_BLOGS = (page) => {
  return axios.get(`${api.blogs.getBlogs}${page}`, {
    headers: { "Content-Type": "application/json" },
  });
};

/**
 * Retriving blog details
 * @memberof module:api/request
 * @param {number} postId 
 * @returns {Object}
 */
export const GET_BLOG_DETAILS = (postId) => {
  return axios.get(`${api.blogs.getBlogDetails}${postId}`, {
    headers: { "Content-Type": "application/json" },
  });
};
