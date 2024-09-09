import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BadgeStatus from "../../../components/BadgeStatus";
import Iconify from "../../../components/Iconify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorProfileDetails } from "@/redux/features/mentor/mentorSlice";
import { BASE_URL } from "@/utils/axios";
import { fetchStudentProfileView } from "@/redux/features/student/studentSlice";
import { SkeletonConversationItem } from "../../../components/skeleton";

const RootStyle = styled("div")(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 3),
}));

export default function ChatHeaderDetail({ conversationKey }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { loading,profileDeatails } = useSelector((state) => state.mentors);
  const { studentProfileView } = useSelector((state) => state.student);

  useEffect(() => {
    if (userInfo.userStatus === "student") {
      dispatch(fetchMentorProfileDetails(conversationKey));
    }
    if (userInfo.userStatus === "mentor") {
      dispatch(fetchStudentProfileView(conversationKey));
    }
  }, [dispatch, conversationKey, userInfo.userStatus]);

  return (
    <RootStyle>
      <OneAvatar
        profileDeatails={profileDeatails}
        studentProfileView={studentProfileView}
        conversationKey={conversationKey}
        loading={loading}
      />
      <Box sx={{ flexGrow: 1 }} />
      <IconButton>
        <Iconify icon="eva:phone-fill" width={20} height={20} />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:video-fill" width={20} height={20} />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
    </RootStyle>
  );
}

function OneAvatar({ profileDeatails, studentProfileView,loading }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ position: "relative" }}>
        { loading
        ? Array.from(new Array(1)).map((_, index) => (
            <SkeletonConversationItem key={index} />
          )) : profileDeatails?.mentorId ? (
          <Avatar
            src={`${BASE_URL}/${profileDeatails?.mentorProfilePic}`}
            alt={profileDeatails?.mentorName}
          />
        ) : (
          <Avatar
            src={`${BASE_URL}/${studentProfileView?.studentProfilePic}`}
            alt={studentProfileView?.studentName}
          />
        )}

        <BadgeStatus
          status="online"
          sx={{ position: "absolute", right: 2, bottom: 2 }}
        />
      </Box>
      <Box sx={{ ml: 2 }}>
        {
          profileDeatails?.mentorId  ? (
            <Typography variant="subtitle2">
            {profileDeatails?.mentorName}
          </Typography>
          ):(
            <Typography variant="subtitle2">
            {studentProfileView?.studentName}
          </Typography>
          )
        }
        
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          online
        </Typography>
      </Box>
    </Box>
  );
}
