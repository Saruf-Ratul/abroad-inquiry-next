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
import { BASE_URL } from "@/utils/axios";
import { SkeletonConversationItem } from "@/components/skeleton";
import { useUser } from "@/contexts/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { fetchMentorProfileDetails } from "@/redux/features/mentor/mentorSlice";
// import { fetchStudentProfileView } from "@/redux/features/student/studentSlice";
import {
  GET_MENTOR_OVERVIEW,
  MENTORS_PROFILE_VIEW,
} from "@/services/mentorRequests";
import { STUDENT_PROFILE_VIEW_CALL } from "@/services/studentRequests";

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
  marginLeft: "5px",
  wordWrap: "break-word",
  ...theme.typography.body2,
}));

export default function ChatRoomOneParticipant({
  isCollapse,
  onCollapse,
  chatUser,
}) {
  const { user, socketId, lastMsg } = useUser();
  const [loggedInUser, setLoggedInUser] = user;
  const [loading, setLoading] = useState(false);
  const [mentorData, setMentorData] = useState({});
  const [studentData, setStudentData] = useState({});

  // useEffect(() => {
  //   if (!chatUser?.id) return; 
  
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       if (loggedInUser?.userStatus === "student") {
  //         const response = await MENTORS_PROFILE_VIEW(chatUser.id);
  //         setMentorData(response.data);
  //       } 
  //       if(loggedInUser?.userStatus === "mentor"){
  //         const response = await STUDENT_PROFILE_VIEW_CALL(chatUser.id);
  //         setStudentData(response.data);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchData();
  // }, [loggedInUser?.userStatus, chatUser.id]);
  

  function formatMentorPhone(phoneString) {
    if (!phoneString) {
      return "Number not provided"; 
    }
  
    try {
      const phoneData = JSON.parse(phoneString); 
      return `${phoneData.dialCode}-${phoneData.phoneNumber}`; 
    } catch (error) {
      console.error("Invalid phone data", error);
      return "number not provided"; 
    }
  }

  return (
    <>
      {loading ? (
        <SkeletonConversationItem />
      ) : (
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
              alt={
                studentData?.studentId
                  ? `${studentData?.studentName} :`
                  : `${mentorData?.mentorName}`
              }
              src={
                studentData?.studentId
                  ? `${BASE_URL}/${studentData?.studentProfilePic}`
                  : `${BASE_URL}/${mentorData?.mentorProfilePic}`
              }
              sx={{ width: 96, height: 96 }}
            />
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="subtitle1">
                {studentData?.studentId
                  ? studentData?.studentName
                  : mentorData?.mentorName}
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Iconify
                    icon={"heroicons-outline:mail"}
                    width={18}
                    height={18}
                  />
                  <RowTextStyle
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {studentData?.studentId
                      ? studentData?.studentEmail?.length > 20
                        ? `${studentData?.studentEmail?.substring(0, 20)}...`
                        : studentData.studentEmail
                      : mentorData?.mentorEmail?.length > 25
                      ? `${mentorData?.mentorEmail?.substring(0, 23)}...`
                      : mentorData?.mentorEmail}
                  </RowTextStyle>
                </Box>
              </RowStyle>
            </Box>
          </Collapse>

          <Collapse in={isCollapse}>
            <Box sx={{ px: 2.5, pb: 1 }}>
              <RowStyle>
                <Iconify
                  icon={"ph:phone"}
                  width={18}
                  height={18}
                  style={{
                    marginTop: "3px",
                  }}
                />
                <RowTextStyle>
                  {studentData?.studentId
                    ? formatMentorPhone(studentData.studentPhone)
                    : formatMentorPhone(mentorData.mentorPhone)}
                </RowTextStyle>
              </RowStyle>
            </Box>
          </Collapse>
        </>
      )}
    </>
  );
}
