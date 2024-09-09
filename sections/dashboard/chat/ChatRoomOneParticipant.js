import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../../../components/Iconify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMentorProfileDetails } from "@/redux/features/mentor/mentorSlice";
import { BASE_URL } from "@/utils/axios";
import { fetchStudentProfileView } from "@/redux/features/student/studentSlice";

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...theme.typography.overline,
  height: 40,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: "space-between",
  color: theme.palette.text.disabled,
}));

const RowStyle = styled("div")(({ theme }) => ({
  display: "flex",
  margin: theme.spacing(1.5, 0),
}));


const RowTextStyle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: "100%",
  marginLeft:"5px",
  wordWrap: "break-word",
  ...theme.typography.body2,
}));

export default function ChatRoomOneParticipant({
  isCollapse,
  onCollapse,
  conversationKey
}) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { loading, profileDeatails } = useSelector((state) => state.mentors);
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
    <>
      <Box
        sx={{
          pt: 4,
          pb: 3,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          alt={studentProfileView?.studentId ? `${studentProfileView?.studentName} :` : `${profileDeatails?.mentorName}`}
          src={
            studentProfileView?.studentId
              ? `${BASE_URL}/${studentProfileView?.studentProfilePic}`
              : `${BASE_URL}/${profileDeatails?.mentorProfilePic}`
          }
          sx={{ width: 96, height: 96 }}
        />
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="subtitle1">
            {studentProfileView?.studentId ? studentProfileView?.studentName : profileDeatails?.mentorName}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CollapseButtonStyle
        fullWidth
        color="inherit"
        onClick={onCollapse}
        endIcon={
          <Iconify
            icon={
              isCollapse
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            width={16}
            height={16}
          />
        }
      >
        information
      </CollapseButtonStyle>
      <Collapse in={isCollapse}>
        <Box sx={{ px: 2.5, pb: 1 }}>
          <RowStyle>
          <Iconify
                  icon={"heroicons-outline:mail"}
                  width={18}
                  height={18}
                  style={{
                    marginTop:"3px"
                  }}
                />
            <RowTextStyle>
              {studentProfileView?.studentId
                ? studentProfileView.studentEmail
                : profileDeatails.mentorEmail}
            </RowTextStyle>
          </RowStyle>
        </Box>
      </Collapse>
    </>
  );
}
