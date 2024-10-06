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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConversations,
  fetchMessage,
  fetchSearchMessage,
} from "@/redux/features/chat/chatSlice";
import { ChatSidebar, ChatWindow } from "@/sections/dashboard/chat";
import Cookies from "js-cookie";
import { useUser } from "@/contexts/UserContext";
import conversation from "@/services/controllers/conversation";
import { GET_MENTOR_OVERVIEW } from "@/services/mentorRequests";
import io from "socket.io-client";
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


  const matchesSm = useMediaQuery("(max-width:900px)");
  const [typedMessage, setTypedMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [isTyping, setIsTying] = useState(false);
  const [loadMsg, setLoadMsg] = useState(true);
  const [scrollToBottom, setScrollToBottom] = useState(false);

  const stateRef = useRef();
  const [mentorData, setMentorData] = useState({});
  const [page, setPage] = useState(1);

  const socket = io("https://realtime.abroadinquiry.com:2096", {
    path: "/socket.io",       
    secure: true,             
  });


  //================ Creating Chatting Connection ====================//
  useEffect(() => {
    setMessages([]);
    setTypedMessage("");
    setLoadMsg(true);
    setPage(1);

    if (userStatus !== loggedInUser.userStatus) {
      GET_MENTOR_OVERVIEW(userId)
        .then((res) => {
          setMentorData(res.data);
        })
        .catch((err) => { });
    } else {
      navigate("/user/messages");
    }
  }, [userStatus, userId, chatUser]);



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
    socket?.on("receiveTyping", (data) => {
      return data.isTyping && data.sender === stateRef.current
        ? setIsTying(true)
        : setIsTying(false);
    });

    return () => {
      socket?.off("receiveTyping", (data) => { });
    };
  }, [socket]);

  
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
    <Container maxWidth={"xl"}>
      <Card sx={{ height: "80vh", display: "flex" }}>
         <ChatSidebar 
         lastMessage = {lastMessage}
         setLastMessage = {setLastMessage}
         chatUser = {chatUser}

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

