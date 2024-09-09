"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConversations,
  fetchMessage,
  fetchSearchMessage,
} from "@/redux/features/chat/chatSlice";
import { ChatSidebar, ChatWindow } from "@/sections/dashboard/chat";
import Cookies from "js-cookie";

export default function Chat({ params }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [lastMessage ,setLastMessage] = useState("");
  const { messages, conversations, loading } = useSelector(
    (state) => state.chat
  );

  const conversationId = Cookies.get("conversationId");
  const {conversationKey} = params;


  useEffect(() => {
    if (conversationId) {
      dispatch(fetchMessage({ id: conversationId, page: 1 }));
      dispatch(fetchConversations(1));
    }
  }, [dispatch, conversationId]);





  return (
    <Container maxWidth={"xl"}>
      <Card sx={{ height: "80vh", display: "flex" }}>
        <ChatSidebar lastMessage={lastMessage} conversationKey={conversationKey} />
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              mt: 2,
              ml:36
            }}
          >
            <CircularProgress
              sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
            />
          </Box>
        ) : (
          <ChatWindow
            setLastMessage={setLastMessage}
            messages={messages}
            conversations={conversations}
            loading={loading}
            conversationKey={conversationKey}
          />
        )}
      </Card>
    </Container>
  );
}
