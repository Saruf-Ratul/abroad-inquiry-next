import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllblogPosts, getblogPostDetails } from "./newsfeedAPI.js";

const initialState = {
  loading: false,
  isError: false,
  error: "",
  blogs: [],
  blogDetails: {},
};

//create thunk

export const fetchBlogPosts = createAsyncThunk(
  "blogPosts/fetchBlogPosts",
  async (page) => {
    const blogs = getAllblogPosts(page);
    return blogs;
  }
);

export const fetchBlogPostDetails = createAsyncThunk(
  "blogPosts/fetchBlogPostDetails",
  async (id) => {
    const blogDetails = getblogPostDetails(id);
    return blogDetails;
  }
);

// create slice

const blogPostsSlice = createSlice({
  name: "blogPosts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.blogs = action.payload.data.blogs;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.blogs = [];
      })
      .addCase(fetchBlogPostDetails.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchBlogPostDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.blogDetails = action.payload.data;
      })
      .addCase(fetchBlogPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.blogDetails = {};
      });
  },
});

export default blogPostsSlice.reducer;
