import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createNewConversation, getMessage, getOldConversation, searchMessage } from "./chatAPI.js"

const initialState = {
  loading : false,
  isError: false,
  error: "",
  totalConversation : 0,
  messages: [],
  conversations: [],
  searchedMessages: [],
  activeConversationId: null,
  participants: [],
  recipients: [],
}

// create thunk 

export const fetchConversations = createAsyncThunk("coversation/fetchConversations",
  async(page)=>{
  const conversations = getOldConversation(page);
  return conversations ;
})

export const fetchMessage = createAsyncThunk(
  "conversation/fetchMessage", 
  async ({ id , page  }) => {
    const messages = await getMessage(id, page);
    return messages;
  }
);


export const createConversation = createAsyncThunk("coversation/createConversation", async()=>{
  const response = createNewConversation();
  return response;
});

export const fetchSearchMessage = createAsyncThunk(
  "conversation/fetchSearchMessage",
  async ({ keyword, pageNumber }) => {
    const searchMessageResponse = await searchMessage(keyword, pageNumber);
    return searchMessageResponse;
  }
);


// create slice 

const chatSlice = createSlice({
  name:"conversations",
  initialState,
  extraReducers: (builder) =>{
        builder
          // conversation
          .addCase(fetchConversations.pending, (state)=>{
            state.loading = true ;
            state.isError = false ;
          })
          .addCase(fetchConversations.fulfilled, (state,action)=>{
            state.loading = false;
            state.conversations = action.payload?.conversationData;
            state.totalConversation = action.payload?.totalConversation;
          })
          .addCase(fetchConversations.rejected,(state,action)=>{
            state.loading = false;
            state.isError = true;
            state.conversations = [];
            state.error = action.error?.message;
          })
          // all message 
          .addCase(fetchMessage.pending, (state)=>{
            state.loading = true ;
            state.isError = false ;
          })
          .addCase(fetchMessage.fulfilled, (state,action)=>{
            state.loading = false;
            state.messages = action.payload;
          })
          .addCase(fetchMessage.rejected, (state,action)=>{
            state.loading = false;
            state.isError = true ;
            state.messages = [];
            state.error = action.error?.message;
          })
          // search message
          .addCase(fetchSearchMessage.pending, (state)=>{
            state.loading = true ;
            state.isError = false ;
          })
          .addCase(fetchSearchMessage.fulfilled, (state, action) => {
            state.loading = false;
            if (action.meta.arg.pageNumber === 1) {
              state.searchedMessages = action.payload || [];
            } else {
              state.searchedMessages = [
                ...state.searchedMessages,
                ...(action.payload || [])
              ];
            }
          })
          .addCase(fetchSearchMessage.rejected,(state,action)=>{
            state.loading = false;
            state.isError = true;
            state.searchedMessages = [];
            state.error = action.error?.message;
          })
  }
})



export default chatSlice.reducer ;