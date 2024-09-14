"use client";
import { List } from "@mui/material";
import { useRouter } from "next/navigation";
import { SkeletonConversationItem } from "../../../components/skeleton";
import { PATH_DASHBOARD } from "@/routes/paths";
import ChatConversationItem from "./ChatConversationItem";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateConversationRead } from "@/redux/features/chat/chatSlice";

export default function ChatConversationList({
  conversationKey,
  lastMessage,
  conversations,
  isOpenSidebar,
  activeConversationId,
  loading,
  sx,
  ...other
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [updatedConversations, setUpdatedConversations] = useState([]);
  const { userInfo } = useSelector((state)=>state.user)

  useEffect(() => {
    if (conversationKey && lastMessage) {
      const newConversations = conversations.map((conversation) => {
        const slecetItem =
          String(conversationKey).trim() === String(conversation.id).trim();
        if (slecetItem) {
          return {
            ...conversation,
            updatedAt: new Date().getTime(),
            lastText: lastMessage,
          };
        }
        return conversation;
      });
      setUpdatedConversations(newConversations);
    } else {
      setUpdatedConversations(conversations);
    }
  }, [conversationKey, lastMessage, conversations]);

  const handleSelectConversation = (id, conversationId, fcmToken, isUnread) => {
    const index = updatedConversations.findIndex((x) => x.id === id);
    if (index !== -1) {
      const updatedConversation = [...updatedConversations];
      updatedConversation[index] = {
        ...updatedConversation[index],
        isUnread: false, 
      };
      setUpdatedConversations(updatedConversation); 
    }

    try {
      const data ={
        conversation: conversationId,
        user: userInfo.id,
      }
      dispatch(updateConversationRead(data));
    } catch (error) {
      console.error(error);
    }
  
    Cookies.set("fcmToken", fcmToken);
    Cookies.set("conversationId", conversationId);
    router.push(PATH_DASHBOARD.chat.view(id));
  };
  

  const sortedConversations = updatedConversations
    .filter((conversation) => conversation.lastText !== null)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <List disablePadding sx={sx} {...other}>
      {loading
        ? Array.from(new Array(5)).map((_, index) => (
            <SkeletonConversationItem key={index} />
          ))
        : sortedConversations.map((conversation) => {
            const isSelected =
              String(conversationKey).trim() === String(conversation.id).trim();
            return (
              <ChatConversationItem
                key={conversation.id}
                isOpenSidebar={isOpenSidebar}
                conversation={conversation}
                isSelected={isSelected}
                onSelectConversation={() =>
                  handleSelectConversation(
                    conversation.id,
                    conversation.chatDetails,
                    conversation.fcmToken,
                    conversation.isUnread
                  )
                }
              />
            );
          })}
    </List>
  );
}
