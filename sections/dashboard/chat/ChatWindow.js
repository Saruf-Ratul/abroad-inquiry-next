"use client";
import { Box, Divider } from "@mui/material";
import ChatHeaderCompose from "./ChatHeaderCompose";
import ChatHeaderDetail from "./ChatHeaderDetail";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessageList from "./ChatMessageList";
import ChatRoom from "./ChatRoom";
import { useEffect, useState } from "react";

export default function ChatWindow({
  messages,
  conversations,
  loading,
  conversationKey,
  setLastMessage,
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
          <ChatHeaderDetail conversationKey={conversationKey} />
        ) : (
          <ChatHeaderCompose />
        )}

        <Divider />

        <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
          <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
            <ChatMessageList
              chatmessages={chatmessages}
              loading={loading}
              conversationKey={conversationKey}
            />
            <Divider />

            {mode === "DETAIL" ? (
              <ChatMessageInput
                setLastMessage={setLastMessage}
                chatmessages={chatmessages}
                setChatMessages={setChatMessages}
                conversations={conversations}
                conversationKey={conversationKey}
              />
            ) : null}
          </Box>

          {mode === "DETAIL" && (
            <ChatRoom
              chatmessages={chatmessages}
              conversations={conversations}
              conversationKey={conversationKey}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
