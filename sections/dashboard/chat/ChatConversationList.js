"use client";
import { List } from "@mui/material";
import { SkeletonConversationItem } from "../../../components/skeleton";
import ChatConversationItem from "./ChatConversationItem";


export default function ChatConversationList({
  conversationKey,
  lastMessage,
  setLastMessage,
  conversations,
  handleConversationClick,
  isOpenSidebar,
  activeConversationId,
  loading,
  chatUser,
  sx,
  ...other
}) {


  return (
    <List disablePadding sx={sx} {...other}>
      {loading
        ? Array.from(new Array(5)).map((_, index) => (
            <SkeletonConversationItem key={index} />
          ))
        : conversations.map((conversation) => {
            const isSelected =
              String(chatUser?.id).trim() === String(conversation?.id).trim();
            return (
              <ChatConversationItem
                key={conversation.id}
                isOpenSidebar={isOpenSidebar}
                conversation={conversation}
                isSelected={isSelected}
                onSelectConversation={() =>
                  handleConversationClick(conversation)
                }
              />
            );
          })}
    </List>
  );
}
