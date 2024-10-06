import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { debounce } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiArrowBack, BiSend, BiSmile } from "react-icons/bi";
import { FaImage } from "react-icons/fa6";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { FaStop } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { format } from "timeago.js";
import { UserContext } from "../../App";
import NewConvImg from "../../assets/images/new-conv.webp";
import { BASE_URL } from "../../services/apis";
import {
  default as ConversationController,
  default as conversation,
} from "../../services/controllers/conversation";
import { GET_MESSAGE_CALL } from "../../services/conversationRequest";
import { GET_MENTOR_OVERVIEW } from "../../services/mentorRequests";
import ActiveBadge from "../ActiveBadge";
import Message from "./Message";
import TypingMsg from "./TypingMsg";


export const MessageContainer = styled(Box)({
  "&::-webkit-scrollbar": {
    width: 5,
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "lightgrey",
    outline: `1px solid slategrey`,
  },
});

const MessageView = React.memo(() =>{
  const matchesSm = useMediaQuery("(max-width:900px)");
  const [typedMessage, setTypedMessage] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, socketId, lastMsg } = useContext(UserContext);
  const [socket, setSocket] = socketId;
  const [loggedInUser, setLoggedInUser] = user;
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { userStatus, userId } = useParams();
  const navigate = useNavigate();
  const [lastMessage, setLastMessage] = lastMsg;
  const [isTyping, setIsTying] = useState(false);
  const [loadMsg, setLoadMsg] = useState(true);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [messages, setMessages] = useState([]);
  const stateRef = useRef();
  const [mentorData, setMentorData] = useState({});
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const { chatUser, chatUserCode } = useOutletContext();
  const[cloudinaryMessage,setCloudinaryMessage] = useState("");


  stateRef.current = chatUserCode;

  console.log("socketId:",socketId);
  console.log("socket:",socket);



  //================ Creating voice ====================//

  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState('');


  //================ Start Recording ====================//
   const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
          const audioBlob = new Blob([e.data], { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
        };
        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
      })
      .catch((err) => console.error('Error accessing microphone:', err));
  };

  //================ Stop Recording ====================//
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setMediaRecorder(null); 
      mediaRecorder.ondataavailable = (e) => {
        const audioBlob = new Blob([e.data], { type: 'audio/wav' });
        handleUpload(audioBlob);
      };
    }
  };


//================ Recording File Upload in Cloudinary ====================//
  const handleUpload = async (blob) => {
    const data = new FormData();
    data.append('file', blob);
    data.append("upload_preset", "cfrv3lsz");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dktbmmmym/upload", {
        method: 'POST',
        body: data,
      });
      const urlData = await response.json();
      setCloudinaryMessage(urlData.url);
    } catch (error) {
      console.error('Error uploading audio to Cloudinary:', error);
    }
  };



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
  //========================================================//

  //================ Getting Messages From DB ====================//

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

  const handleScroll = (e) => {
    let element = e.target;
    if (element.scrollTop === 0) {
      setPage((prev) => prev + 1);
      setLoading(true);
      setLoadMsg(true);
    }
  };

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [containerRef, scrollToBottom]);

  //========================================================//
  useEffect(() => {
    if (lastMessage != null && lastMessage?.sender == chatUserCode) {
      setScrollToBottom(!scrollToBottom);
      setMessages((prevMsgs) => [...prevMsgs, lastMessage]);
    }
  }, [lastMessage]);

  //========================================================//

  // =============== Is typing checking ============== //
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
  //========================================================//

  // =============== Send Message Func ============== //
  const handleSendMessage = (e) => {
    //e.preventDefault();
    setScrollToBottom(!scrollToBottom);
    if (typedMessage) {
      let timeStamp = new Date().getTime();
      socket?.emit("sendMessage", {
        text: typedMessage ?  JSON.stringify(typedMessage.trim()) : JSON.stringify(cloudinaryMessage.trim()) ,
        sender: loggedInUser.userStatus.concat(loggedInUser.id.toString()),
        chatId: chatUser?.chatDetails,
        messagesId: timeStamp,
        receiver: userStatus.concat(chatUser?.id),
        timeStamp: timeStamp,
        senderName: loggedInUser?.name,
        isMyMessage: false,
        fcmToken: chatUser.fcmToken,
        authentication_token: localStorage.getItem("token")
          ? `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          : null,
      });

      setLastMessage({
        text: JSON.stringify(typedMessage.trim()),
        sender: loggedInUser.userStatus.concat(loggedInUser.id.toString()),
        chatId: chatUser?.chatDetails,
        messagesId: timeStamp,
        timeStamp: timeStamp,
        receiver: chatUser?.id,
        isMyMessage: true,
      });

      setMessages([
        ...messages,
        {
          text: JSON.stringify(typedMessage.trim()),
          sender: loggedInUser.userStatus.concat(loggedInUser.id.toString()),
          chatId: chatUser?.chatDetails,
          timeStamp: timeStamp,
          messagesId: timeStamp,
          isReceived: false,
        },
      ]);
      setTypedMessage("");
    }
  };
  //========================================================//

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const popoverData = [
    {
      title: "View Profile",
      path: () =>
        navigate(
          `/profile/${userStatus === "mentor"
            ? `mentor/${chatUser?.id}`
            : `student/${chatUser?.id}`
          }`
        ),
      user: loggedInUser.userStatus,
    },
    {
      title: "Book Appointment",
      path: () =>
        navigate(`/user/appointment-booking/${userId}`, {
          state: mentorData,
        }),
      user: "student",
    },
    {
      title: "Delete Chat",
      path: "",
      user: loggedInUser.userStatus,
    },
  ];

  // =============== Input Change State Update & Typing Status Sending ============== //
  const handleInputChange = (e) => {
    setTypedMessage(e.target.value.trimStart());
    socket.emit("typing", {
      receiver: userStatus.concat(chatUser?.id),
      sender: loggedInUser.userStatus.concat(loggedInUser.id.toString()),
      isTyping: true,
    });
  };
  // ======================================================== //

  // =============== Debounce & Typing Stopped Sending ============== //
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      socket.emit("typing", {
        receiver: userStatus.concat(chatUser?.id),
        sender: loggedInUser.userStatus.concat(loggedInUser.id.toString()),
        isTyping: false,
      });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [typedMessage]);

  
  //================ Image upload in cloudinary====================//

  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qa0jrcnk");

    try {
      let res = await fetch("https://api.cloudinary.com/v1_1/dktbmmmym/image/upload", {
        method: "post",
        body: data,
      });

      const urlData = await res.json();
      setCloudinaryMessage(urlData.url);

    } catch (error) {
      console.log(error);
    }
  };


  //================ Calling handle Send Message when voice and image url get ====================//
  useEffect(() => {
    if (cloudinaryMessage.includes("http://res.cloudinary.com")) {
      handleSendMessage();
    }
  }, [cloudinaryMessage]);


  console.log("chatUser:",chatUser);


  return (
    <>
      {matchesSm && (
        <Box width="100%" textAlign="right" mt={-2} py={0.5}>
          <Button
            onClick={() => navigate("/user/messages")}
            size="small"
            variant="text"
            startIcon={<BiArrowBack />}
          >
            Messages
          </Button>
        </Box>
      )}
      <Paper
        component={Box}
        height="90vh"
        position="relative"
        overflow="hidden"
      >
        <List>
          <ListItem
            secondaryAction={
              <>
                <IconButton edge="end" onClick={handlePopoverClick}>
                  <BsThreeDotsVertical />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <List component={Box} width={160}>
                    {popoverData.map(
                      (item, idx) =>
                        item.user === loggedInUser.userStatus && (
                          <ListItem disablePadding key={idx}>
                            <ListItemButton onClick={item.path}>
                              <ListItemText
                                primary={
                                  <Typography variant="body2">
                                    {item.title}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        )
                    )}
                  </List>
                </Popover>
              </>
            }
          >
            <ListItemAvatar>
              <IconButton disableRipple onClick={popoverData[0].path}>
                <ActiveBadge isOnline={state?.isOnline}>
                  <Avatar
                    src={`${BASE_URL}/${chatUser?.profilePic}`}
                    alt={chatUser?.name}
                  />
                </ActiveBadge>
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1">{chatUser?.name}</Typography>
              }
              secondary={
                <Typography display="block" variant="caption">
                  {state?.isOnline
                    ? "Active"
                    : `last seen ${format(new Date(state?.lastActive))}`}
                </Typography>
              }
            />
          </ListItem>
          <Divider />
        </List>
        <MessageContainer
          sx={{ overflow: "scroll", height: "90%", pb: 10, mt: -1 }}
          ref={containerRef}
          onScroll={handleScroll}
        >
          {messages.length && loading ? (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress size={30} thickness={1.5} />
            </Box>
          ) : null}
          {messages.length ? (
            messages.map((message, idx) => (
              <div key={idx}>
                <Message
                  message={{
                    ...message,
                    profilePic:
                      message.sender ===
                        loggedInUser.userStatus.concat(loggedInUser.id.toString())
                        ? loggedInUser.profilePic
                        : chatUser?.profilePic,
                  }}
                />
              </div>
            ))
          ) : (
            <Box m="auto" display="flex" py={5} justifyContent="center">
              <img src={NewConvImg} alt="" width="50%" />
            </Box>
          )}
          {isTyping ? <TypingMsg profilePic={chatUser?.profilePic} /> : null}
        </MessageContainer>
        <Box position="absolute" bottom={0} width="100%">
          <Divider />
          <form onSubmit={handleSendMessage}>
            <TextField
              sx={{ bgcolor: "#FFFF", height: "10%", px: 2, py: 1 }}
              fullWidth
              autoComplete="off"
              value={typedMessage}
              onChange={handleInputChange}
              multiline
              maxRows={3}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {typedMessage ? (
                      <IconButton
                        edge="end"
                        size="large"
                        color="primary"
                        type="submit"
                        onClick={handleSendMessage}
                      >
                        <BiSend />
                      </IconButton>
                    ) : (
                      <label htmlFor="image-upload">
                        <IconButton
                          component="span"
                          size="large"
                          color="primary"
                        >
                          <FaImage />
                        </IconButton>
                      </label>
                    )}
                    {recording ? (
                      <IconButton
                        edge="end"
                        size="large"
                        color="primary"
                        onClick={stopRecording}
                      >
                        <FaStop />
                      </IconButton>
                    ) : (
                      <IconButton
                        edge="end"
                        size="large"
                        color="primary"
                        onClick={startRecording}
                      >
                        <MdOutlineKeyboardVoice />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  // Prevents submitting the form
                  handleSendMessage(e);
                }
              }}
            />
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </form>

        </Box>
      </Paper>
    </>
  );
})

export default React.memo(MessageView);
