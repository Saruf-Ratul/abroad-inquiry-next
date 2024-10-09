"use client";
import { Box, CircularProgress, Divider,useTheme } from "@mui/material";
import ChatHeaderCompose from "./ChatHeaderCompose";
import ChatHeaderDetail from "./ChatHeaderDetail";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessageList from "./ChatMessageList";
import ChatRoom from "./ChatRoom";
import { useEffect, useState } from "react";


export default function ChatWindow({
  setLastMessage,
  setMessages,
  messages,
  loading,
  chatUser,
  userStatus,
  userId 
}) {
  const theme = useTheme();
  const [chatmessages, setChatMessages] = useState([]);
  const mode = messages ? "DETAIL" : "COMPOSE";

  useEffect(() => {
    if (messages) {
      setChatMessages(messages);
    }
  }, [setChatMessages, messages]);

  return (
    <>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {mode === "DETAIL" ? (
          <ChatHeaderDetail  chatUser={chatUser} loading={loading}/>
        ) : (
          <ChatHeaderCompose />
        )}

        <Divider />

        <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
          {
            loading ? (
              <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              mt: 2,
              ml:24,
              mr:24

            }}
          >
            <CircularProgress
              sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
            />
          </Box>
            ):(
              <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
            <ChatMessageList
              messages={messages}  
              chatUser ={chatUser} 
              userStatus={userStatus}
              userId = {userId}           
            />
            <Divider />

            {mode === "DETAIL" ? (
              <ChatMessageInput
                setLastMessage={setLastMessage}
                setMessages={setMessages}
                messages = {messages}
                loading = {loading}
                chatUser = {chatUser}
                userStatus ={userStatus}
              />
            ) : null}
          </Box>
            )
          }

          {mode === "DETAIL" && (
            <ChatRoom
             chatUser={chatUser}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
