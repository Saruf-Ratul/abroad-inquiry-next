import { Avatar, Box, List, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { isJsonString } from "@/utils/isJsonString";
import Image from "next/image";
import { SkeletonConversationItem } from "@/components/skeleton";
import { BASE_URL } from "@/utils/axios";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { format } from "timeago.js";
import Iconify from "../../../components/Iconify";


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

export default function ChatMessageItem({
  message,
  chatUser,
  userStatus,
  userId,
}) {
  const theme = useTheme();
  const { user, socketId, lastMsg } = useUser();
  const [loggedInUser, setLoggedInUser] = user;
  const [loading, setLoading] = useState(false);
  const isMe =
    loggedInUser?.userStatus?.concat(loggedInUser?.id.toString()) ===
    message?.sender;

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
              isMe
                ? `${BASE_URL}/${loggedInUser.profilePic}`
                : `${BASE_URL}/${chatUser?.profilePic}`
            }
            alt={isMe ? `${loggedInUser.name}` : `${chatUser?.name}`}
            sx={{ width: 36, height: 36, mt: 1 }}
          />

          <Box sx={{ ml: 1 }}>
            <ContentStyle
              sx={{
                ...(isMe && {
                  color: "wheat",
                  bgcolor: message?.text.includes("res.cloudinary.com")
                    ? undefined
                    : "blueviolet",
                }),
              }}
            >
              {message?.text.includes(
                "res.cloudinary.com/dktbmmmym/image/upload"
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
                  "res.cloudinary.com/dktbmmmym/video/upload"
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
                  variant="body2"
                  style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
                >
                  {isJsonString(message?.text)
                    ? JSON.parse(message?.text)
                    : message?.text}
                </Typography>
              )}
            </ContentStyle>

            <Box
              display="flex"
              justifyContent="right"
              alignItems="center"
              mb={-1.5}
            >
              <Typography
                display="inline"
                variant="caption"
                sx={{
                  fontSize: "10px",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
              >
                {format(message?.timeStamp)}
              </Typography>
              &nbsp;
              {message?.isReceived ? (
                <Iconify
                  icon="codicon:check-all"
                  width={12}
                  height={12}
                  style={{ color: "blue" }}
                />
              ) : (
                <Iconify icon="codicon:check-all" width={12} height={12} />
              )}
            </Box>
          </Box>
        </Box>
      )}
    </RootStyle>
  );
}
