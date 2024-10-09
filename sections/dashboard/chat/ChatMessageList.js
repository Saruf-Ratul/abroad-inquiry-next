"use client";
import { useEffect, useRef, useState } from "react";
import Scrollbar from "../../../components/Scrollbar";
import ChatMessageItem from "./ChatMessageItem";


export default function ChatMessageList({ 
  conversation,
  messages,
  loading,
  chatUser,
  userStatus,
  userId 
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [messages]);

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{ ref: scrollRef }}
        sx={{ p: 3, height: 1 }}
      >
        {messages?.map((message) => (
          <ChatMessageItem
            key={message.timeStamp}
            message={message}
            loading={loading}
            conversation={conversation}
            chatUser={chatUser}
            userStatus={userStatus}
            userId = {userId}   
          />
        ))}
      </Scrollbar>
    </>
  );
}
