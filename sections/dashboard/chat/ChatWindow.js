"use client";
import { Box, Divider } from "@mui/material";
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
  userStatus


}) {
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
          <ChatHeaderDetail  chatUser={chatUser}/>
        ) : (
          <ChatHeaderCompose />
        )}

        <Divider />

        <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
          <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
            <ChatMessageList
              messages={messages}              
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
