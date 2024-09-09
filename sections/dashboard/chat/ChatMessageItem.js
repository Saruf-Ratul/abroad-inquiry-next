import { Avatar, Box, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { isJsonString } from "@/utils/isJsonString";
import Image from "next/image";
import { SkeletonConversationItem } from "@/components/skeleton";
import { fetchMentorProfileDetails } from "@/redux/features/mentor/mentorSlice";
import { fetchStudentProfileView } from "@/redux/features/student/studentSlice";
import { BASE_URL } from "@/utils/axios";
import { useEffect } from "react";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
}));

const MessageImgStyle = styled("Image")(({ theme }) => ({
  height: 200,
  minWidth: 296,
  width: "100%",
  cursor: "pointer",
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
}));

export default function ChatMessageItem({ message, loading, conversationKey }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { profileDeatails } = useSelector((state) => state.mentors);
  const { studentProfileView } = useSelector((state) => state.student);

  useEffect(() => {
    if (userInfo.userStatus === "student") {
      dispatch(fetchMentorProfileDetails(conversationKey));
    }
    if (userInfo.userStatus === "mentor") {
      dispatch(fetchStudentProfileView(conversationKey));
    }
  }, [dispatch, conversationKey, userInfo.userStatus]);

  const isMe =
    userInfo?.userStatus?.concat(userInfo?.id.toString()) === message?.sender;

 
  return (
    <RootStyle>
      {loading ? (
        <List>
          {Array(1)
            .fill(null)
            .map((_, index) => (
              <SkeletonConversationItem key={index} />
            ))}
        </List>
      ) : (
        <Box
          sx={{
            display: "flex",
            ...(isMe && {
              ml: "auto",
            }),
          }}
        >
          <Avatar
            src={
              userInfo?.userStatus?.concat(userInfo?.id.toString()) ===
              message?.sender
                ? `${BASE_URL}/${userInfo?.profilePic}`
                : profileDeatails?.mentorId
                ? `${BASE_URL}/${profileDeatails?.mentorProfilePic}`
                : `${BASE_URL}/${studentProfileView?.studentProfilePic}`
            }
            alt={userInfo?.name}
            sx={{ width: 36, height: 36, mt: 1 }}
          />

          <Box sx={{ ml: 1 }}>
            <ContentStyle
              sx={{
                ...(isMe && {
                  color: "wheat",
                  bgcolor: "blueviolet",
                }),
              }}
            >
              {message?.text.includes(
                "http://res.cloudinary.com/dktbmmmym/image/upload"
              ) ? (
                <MessageImgStyle>
                  <Image
                    src={
                      isJsonString(message?.text)
                        ? JSON.parse(message?.text)
                        : message?.text
                    }
                    alt="Cloudinary Image"
                    width={250}
                    height={250}
                  />
                </MessageImgStyle>
              ) : message?.text.includes(
                  "http://res.cloudinary.com/dktbmmmym/video/upload"
                ) ? (
                <audio controls autoplay muted>
                  <source
                    src={
                      isJsonString(message?.text)
                        ? JSON.parse(message?.text)
                        : message.text
                    }
                    type="audio/mpeg"
                  />
                </audio>
              ) : (
                <Typography
                  variant="subtitle2"
                  style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
                >
                  {isJsonString(message?.text)
                    ? JSON.parse(message?.text)
                    : message?.text}
                </Typography>
              )}
            </ContentStyle>
          </Box>
        </Box>
      )}
    </RootStyle>
  );
}
