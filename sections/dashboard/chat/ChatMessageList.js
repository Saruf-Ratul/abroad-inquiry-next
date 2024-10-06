"use client";
import { useEffect, useRef, useState } from "react";
import Scrollbar from "../../../components/Scrollbar";
import ChatMessageItem from "./ChatMessageItem";


export default function ChatMessageList({ conversation,messages,loading,conversationKey}) {
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
            conversationKey={conversationKey}
          />
        ))}
      </Scrollbar>
    </>
  );
}
