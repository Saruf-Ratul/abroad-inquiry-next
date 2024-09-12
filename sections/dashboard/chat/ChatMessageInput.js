"use client";
import { useEffect, useRef, useState } from "react";
import {
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmojiPicker from "../../../components/EmojiPicker";
import Iconify from "../../../components/Iconify";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Cookies from "js-cookie";

const RootStyle = styled("div")(({ theme }) => ({
  minHeight: 56,
  display: "flex",
  position: "relative",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
}));

export default function ChatMessageInput({
  disabled,
  conversationKey,
  chatmessages,
  setChatMessages,
  conversations,
  setLastMessage,
}) {
 
  const socket = io("https://realtime.abroadinquiry.com:2096", {
    path: "/socket.io",       
    secure: true,             
  });

  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [cloudinaryMessage, setCloudinaryMessage] = useState("");
  const [mentorId, setMentorId] = useState();
  const [studentId, setSudentId] = useState();
  const fcmToken = Cookies.get("fcmToken");
  const conversationId = Cookies.get("conversationId");
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (message) {
      setLastMessage(message);
    }
  }, [setLastMessage, message]);

  useEffect(() => {
    conversations?.forEach((con) => {
      chatmessages?.forEach((m) => {
        if (`mentor${con.id}` === m.sender) {
          setMentorId(con.id);
        }
        if (`student${con.id}` === m.sender) {
          setSudentId(con.id);
        }
      });
    });
  }, [conversations, chatmessages]);




  //================ Creating voice ====================//

  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState("");

  //================ Start Recording ====================//
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
          const audioBlob = new Blob([e.data], { type: "audio/wav" });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
        };
        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
      })
      .catch((err) => console.error("Error accessing microphone:", err));
  };

  //================ Stop Recording ====================//
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setMediaRecorder(null);
      mediaRecorder.ondataavailable = (e) => {
        const audioBlob = new Blob([e.data], { type: "audio/wav" });
        handleUpload(audioBlob);
      };
    }
  };

  //================ Recording File Upload in Cloudinary ====================//
  const handleUpload = async (blob) => {
    const data = new FormData();
    data.append("file", blob);
    data.append("upload_preset", "cfrv3lsz");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dktbmmmym/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await response.json();
      setCloudinaryMessage(urlData.url);
    } catch (error) {
      // console.error('Error uploading audio to Cloudinary:', error);
    }
  };

  //================ Image upload in cloudinary ====================//
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qa0jrcnk");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dktbmmmym/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const urlData = await res.json();
      setCloudinaryMessage(urlData.url);
    } catch (error) {
      // console.log(error);
    }
  };

  //================ Calling handle Send Message when voice and image url get ====================//
  useEffect(() => {
    if (cloudinaryMessage?.includes("res.cloudinary.com")) {
      handleSend();
    }
  }, [cloudinaryMessage]);

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message && !cloudinaryMessage) {
      return "";
    }
    let timeStamp = new Date().getTime();
    const token = Cookies.get("token")
      ? `Bearer ${Cookies.get("token")}`
      : null;

    socket?.emit("sendMessage", {
      text: message ? message.trim() : cloudinaryMessage.trim(),
      sender: userInfo.userStatus.concat(userInfo.id.toString()),
      chatId: conversationId,
      messagesId: new Date().getTime(),
      receiver: mentorId
        ? "mentor".concat(mentorId)
        : "student".concat(studentId),
      timeStamp: new Date().getTime(),
      senderName: userInfo?.name,
      isMyMessage: false,
      fcmToken: fcmToken,
      authentication_token: token,
    });

    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        text: message ? message.trim() : cloudinaryMessage.trim(),
        sender: userInfo.userStatus.concat(userInfo.id.toString()),
        chatId: conversationKey,
        timeStamp: timeStamp,
        messagesId: timeStamp,
        isReceived: false,
      },
    ]);

    setMessage("");
    setCloudinaryMessage("");
  };

  return (
    <RootStyle>
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message"
        startAdornment={
          <InputAdornment position="start">
            <EmojiPicker
              disabled={disabled}
              value={message}
              setValue={setMessage}
            />
          </InputAdornment>
        }
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageUpload}
            />
            <IconButton
              disabled={disabled}
              size="small"
              onClick={() => fileInputRef.current?.click()}
            >
              <Iconify
                icon="ic:round-add-photo-alternate"
                width={22}
                height={22}
              />
            </IconButton>
            <IconButton disabled={disabled} size="small">
              {recording ? (
                <Iconify
                  icon="icon-park-outline:voice-off"
                  width={22}
                  height={22}
                  onClick={stopRecording}
                />
              ) : (
                <Iconify
                  icon="eva:mic-fill"
                  width={22}
                  height={22}
                  onClick={startRecording}
                />
              )}
            </IconButton>
          </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton color="primary" onClick={handleSend} sx={{ mx: 1 }}>
        <Iconify icon="ic:round-send" width={22} height={22} />
      </IconButton>
    </RootStyle>
  );
}
