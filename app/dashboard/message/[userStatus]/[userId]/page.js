"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChatSidebar, ChatWindow } from "@/sections/dashboard/chat";
import { useUser } from "@/contexts/UserContext";
import conversation from "@/services/controllers/conversation";
import { GET_MESSAGE_CALL } from "@/services/conversationRequest";

export default function MessageView({ params }) {
  const theme = useTheme();
  const { userStatus, userId } = params;
  const { user, socketId, lastMsg } = useUser();
  const [loggedInUser, setLoggedInUser] = user;
  const [chatUser, setChatUser] = useState({});
  const [chatUserCode, setChatUserCode] = useState("");
  const [lastMessage, setLastMessage] = lastMsg;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState(true);
  const [scrollToBottom, setScrollToBottom] = useState(false);

  const stateRef = useRef();
  const [page, setPage] = useState(1);



  const loadMsgFromDb = () => {
    if (loadMsg) {
      GET_MESSAGE_CALL(chatUser?.chatDetails, page)
        .then((res) => {
          
          if (res?.data.length) {
            setMessages((prevMsgs) => [...res.data, ...prevMsgs]);
            setLoadMsg(false);
            setLoading(false);
          }
        })
        .catch((err) => { });
    }
  };

 

  useEffect(() => {
 
    loadMsgFromDb();
  }, [chatUser, loadMsg, userStatus, userId]);

  useEffect(() => {
    if (page === 1 && messages.length) setScrollToBottom(!scrollToBottom);
  }, [messages]);

  
  useEffect(() => {
    if (lastMessage != null && lastMessage?.sender == chatUserCode) {
      setScrollToBottom(!scrollToBottom);
      setMessages((prevMsgs) => [...prevMsgs, lastMessage]);
    }
  }, [lastMessage]);

  
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


  return (
    <Container maxWidth={"xl"} >
      <Card sx={{ height: "80vh", display: "flex" }}>
         <ChatSidebar 
         lastMessage = {lastMessage}
         setLastMessage = {setLastMessage}
         chatUser = {chatUser}
         userStatus={userStatus}
         userId={userId}
         setChatUser={setChatUser}
         setChatUserCode={setChatUserCode}

         />
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
            setMessages={setMessages}
            messages={messages}
            loading={loading}
            chatUser={chatUser}
            userStatus={userStatus}
            
          />
        )}
      </Card>
    </Container>
  );
}

