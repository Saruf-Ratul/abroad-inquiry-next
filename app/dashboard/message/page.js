"use client"; // This component will use React hooks and needs to be a client component

import {
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { MessageContainer } from "@/components/Messages/MessageView";
import conversation from "@/services/controllers/conversation";
import { useUser } from "@/contexts/UserContext";
// import MessageList from "@/components/Messages/MessageList";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { ChatSidebar, ChatWindow } from "@/sections/dashboard/chat";

function Messages({ params }) {
  const matchesSm = useMediaQuery("(max-width:900px)");
  const { userStatus, userId } = params;
  const { user, socketId, lastMsg } = useUser();
  const [loggedInUser, setLoggedInUser] = user;
  const [chatUser, setChatUser] = useState({});
  const [chatUserCode, setChatUserCode] = useState("");
  const [lastMessage, setLastMessage] = lastMsg;
  const router = useRouter(); // Next.js router

  useEffect(() => {
    if (userStatus !== loggedInUser.userStatus && userStatus && userId) {
      conversation.CREATE_NEW_CONVERSATION(
        {
          mentorId: userStatus === "mentor" ? userId : loggedInUser.id,
          studentId: userStatus === "student" ? userId : loggedInUser.id,
        },
        setChatUser,
        setChatUserCode,
        loggedInUser.userStatus
      );
      if (chatUser.isNewConversation) {
        setLastMessage({
          text: "This is hello message from mentor",
          sender: "mentor".concat(chatUser.id),
          chatId: chatUser?.chatDetails,
          messagesId: new Date().getTime(),
          timeStamp: new Date().getTime(),
          receiver: loggedInUser?.id,
          isMyMessage: false,
        });
      }
    } else {
      // Handle navigation if needed
      // router.push("/user/messages");
    }

    return () => {
      setChatUser({});
      setChatUserCode("");
    };
  }, [userStatus, userId]);

  return chatUser || chatUserCode ? (
    <>
      <>
        {matchesSm ? (
          userStatus && userId && matchesSm ? (
            <Grid item xs={12}>
              {/* Outlet handling here if needed */}
            </Grid>
          ) : (
            <Container maxWidth={"xl"}>
              <Card sx={{ height: "80vh", display: "flex" }}>
                <ChatSidebar chatUser={chatUser} chatUserCode={chatUserCode} />
                <ChatWindow chatUser={chatUser} chatUserCode={chatUserCode} />
              </Card>
            </Container>
          )
        ) : (
          <>
            <Container maxWidth={"xl"}>
              <Card sx={{ height: "80vh", display: "flex" }}>
                <ChatSidebar chatUser={chatUser} chatUserCode={chatUserCode} />
                <ChatWindow chatUser={chatUser} chatUserCode={chatUserCode} />
              </Card>
            </Container>
          </>
        )}
      </>
    </>
  ) : (
    ""
  );
}

export default Messages;
