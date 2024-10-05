"use client";
import { Box, Divider } from "@mui/material";
import ChatHeaderCompose from "./ChatHeaderCompose";
import ChatHeaderDetail from "./ChatHeaderDetail";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessageList from "./ChatMessageList";
import ChatRoom from "./ChatRoom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfileView } from "@/redux/features/student/studentSlice";
import { fetchMentorProfileDetails } from "@/redux/features/mentor/mentorSlice";

export default function ChatWindow({
  messages,
  conversations,
  conversationKey,
  setLastMessage,
}) {
  const [chatmessages, setChatMessages] = useState([]);
  const mode = messages ? "DETAIL" : "COMPOSE";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 
  const { userInfo } = useSelector((state) => state.user);
  const [details, setDetails] = useState({
    id: "",
    avatar: "",
    name: "",
    email:""
  });

  const { profileDeatails } = useSelector((state) => state.mentors);
  const { studentProfileView } = useSelector((state) => state.student);
  useEffect(() => {
    setLoading(true); 
    setDetails({ id: "", avatar: "", name: "" }); 

    if (userInfo?.userStatus === "student") {
      dispatch(fetchMentorProfileDetails(conversationKey)).finally(() =>
        setLoading(false)
      );
    } else if (userInfo?.userStatus === "mentor") {
      dispatch(fetchStudentProfileView(conversationKey)).finally(() =>
        setLoading(false)
      );
    }
  }, [dispatch, conversationKey, userInfo?.userStatus]);

  useEffect(() => {
    if (profileDeatails?.mentorId) {
      setDetails({
        id: profileDeatails?.mentorId,
        avatar: profileDeatails.mentorProfilePic,
        name: profileDeatails.mentorName,
        email:profileDeatails.mentorEmail
      });
    } else if (studentProfileView?.studentId) {
      setDetails({
        id: studentProfileView?.studentId,
        avatar: studentProfileView.studentProfilePic,
        name: studentProfileView.studentName,
        email:studentProfileView.studentEmail
      });
    }
  }, [profileDeatails, studentProfileView]);


  useEffect(() => {
    if (messages) {
      setChatMessages(messages);
    }
  }, [setChatMessages, messages]);

  return (
    <>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {mode === "DETAIL" ? (
          <ChatHeaderDetail conversationKey={conversationKey} details={details} loading={loading}/>
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
              details={details} 
              loading={loading}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
