import { Avatar, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { BsCheck2, BsCheck2All } from "react-icons/bs";
import { format } from "timeago.js";
import { UserContext } from "../../App";
import { BASE_URL } from "../../services/apis";
import { isJsonString } from "../../util/isJsonString";

function Message({ message }) {
  const { user, socketId } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const { text, sender, chatId, timeStamp, profilePic, isReceived } = message;
  const [socket, setSocket] = socketId;

  const checkSender = (sender) => {
    return (
      sender === loggedInUser.userStatus.concat(loggedInUser.id.toString())
    );
  };


  return (
    <Box
      display="flex"
      px={2}
      py={2}
      flexDirection={checkSender(sender) ? "row-reverse" : "row"}
    >
      <Avatar src={`${BASE_URL}/${profilePic}`} />
      <Box
        width="70%"
        bgcolor={text.includes("http://res.cloudinary.com/dktbmmmym/image/upload") ? "transparent" : (checkSender(sender) ? "#F4F4F4" : "#3CA3F0")}
        color={checkSender(sender) ? "grey" : "#F4F4F4"}
        borderRadius={3}
        ml={checkSender(sender) ? 0 : 2}
        mr={checkSender(sender) ? 2 : 0}
        p={2}
      >

        {text.includes("http://res.cloudinary.com/dktbmmmym/image/upload") ? (
          <img src={isJsonString(text) ? JSON.parse(text) : text} alt="Cloudinary Image" style={{ maxWidth: "100%", maxHeight: "200px" }} />
        ) : text.includes("http://res.cloudinary.com/dktbmmmym/video/upload") ? (
          <audio controls autoplay muted>
            <source src={isJsonString(text) ? JSON.parse(text) : text} type="audio/mpeg" />
          </audio>
        ) : (
          <Typography
            variant="subtitle2"
            style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
          >
            {isJsonString(text) ? JSON.parse(text) : text}
          </Typography>
        )}

        <Box
          display="flex"
          justifyContent="right"
          alignItems="center"
          mb={-1.5}
          mt={1}
        >
          <Typography display="inline" variant="caption">
            {format(timeStamp)}
          </Typography>
          &nbsp;
          {isReceived ? <BsCheck2All color="green" /> : <BsCheck2 />}
          {/* <BsCheck2All color="green" /> */}
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(Message);
