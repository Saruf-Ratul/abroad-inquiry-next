import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import { UserContext } from "../../App";
import getUserId from "../../others/getUserId";
import { BASE_URL } from "../../services/apis";
import ConversationController from "../../services/controllers/conversation";
import { isJsonString } from "../../util/isJsonString";
import ActiveBadge from "../ActiveBadge";
import { UPDATE_CONVERSATION } from "../../services/mentorRequests";

function MessageList({ chatUser, chatUserCode }) {
  const navigate = useNavigate();
  const { user, socketId, lastMsg } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = user;
  const [socket, setSocket] = socketId;
  const [conversation, setConversation] = React.useState([]);
  const { userStatus, userId } = useParams();
  const [lastMessage, setLastMessage] = lastMsg;
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchActive, setFetchActive] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);

  // =============== Chat history From DB & Searching  ============== //
  const handleInputChange = debounce((e) => {
    setSearchTerm(e.target.value.trimStart());

    setPage(1);
  }, 1000);

  function uniqueById(items) {
    const set = new Set();
    return items.filter((item) => {
      const isDuplicate = set.has(item.id);
      set.add(item.id);
      return !isDuplicate;
    });
  }

  useEffect(() => {
    ConversationController.Search(searchTerm, page)
      .then((res) => {
        if (searchTerm) {
          setConversation(
            uniqueById(
              res.sort((x, y) => {
                return y.timeStamp - x.timeStamp;
              })
            )
          );
        } else {
          if (res?.length) {
            setConversation(
              uniqueById([
                ...conversation,
                ...res.sort((x, y) => {
                  return y.timeStamp - x.timeStamp;
                }),
              ])
            );
          } else {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {});
  }, [searchTerm, chatUser, chatUserCode, page]);

  // ======================================================== //

  const getActiveUsers = () => {
    let users = [];
    if (loggedInUser.userStatus === "student" && conversation.length) {
      conversation?.map((data) => {
        users.push("mentor".concat(data.id));
      });
    } else if (loggedInUser.userStatus === "mentor" && conversation.length) {
      conversation?.map((data) => {
        users.push("student".concat(data.id));
      });
    } else {
    }
    if (user.length) {
      socket.emit("sendUsers", {
        sender: loggedInUser.userStatus.concat(loggedInUser.id),
        users: users,
      });
    }
  };

  React.useEffect(() => {
    getActiveUsers();
  }, [fetchActive]);

  React.useEffect(() => {
    let callBack = (data) => {
      setLastMessage(data);
    };

    socket?.on("getMessage", callBack);

    return () => {
      socket?.off("getMessage", callBack);
    };
  }, [socket]);

  socket?.on("getActiveUserResponse", (data) => {
    if (conversation?.length) {
      data.map((item) => {
        let index = conversation.findIndex(
          (x) => x["id"] === getUserId(item, loggedInUser.userStatus)
        );
        const updateState = [...conversation];
        updateState[index]["isOnline"] = true;
        setConversation(uniqueById(updateState));
      });
    }
  });

  socket.on("getActiveUser", (data) => {
    if (conversation?.length) {
      try {
        let index = conversation?.findIndex(
          (x) => x["id"] === getUserId(data, loggedInUser.userStatus)
        );
        const updateState = [...conversation];
        updateState[index]["isOnline"] = true;
        setConversation(uniqueById(updateState));
      } catch (e) {}
    }
  });

  socket.on("disconnectUser", (data) => {
    if (conversation?.length) {
      let index = conversation?.findIndex(
        (x) => x["id"] === getUserId(data, loggedInUser.userStatus)
      );
      const updateState = [...conversation];
      updateState[index]["isOnline"] = false;
      setConversation(uniqueById(updateState));
    }
  });

  const handleConversationClick = async (item) => {
    item.isUnread = false;
    const index = conversation.findIndex((x) => x.id === item.id);
    if (index !== -1) {
      const updatedConversation = [...conversation];
      updatedConversation[index].isUnread = false;
      setConversation(updatedConversation);
    }

    try {
      const response = await UPDATE_CONVERSATION({
        conversation: item.chatDetails,
        user: loggedInUser.id,
      });
    } catch (error) {
      console.error(error);
    }

    navigate(
      `${loggedInUser.userStatus === "mentor" ? "student/" : "mentor/"}${
        item.id
      }`,
      {
        state: {
          id: item.id,
          name: item.name,
          profilePic: item.profilePic,
          chatDetails: item.chatDetails,
          userStatus:
            loggedInUser.userStatus === "mentor" ? "student" : "mentor",
          isOnline: item.isOnline,
          lastActive: item.lastActive,
        },
      }
    );
  };

  React.useEffect(() => {
    if (conversation.length) {
      if (lastMessage != null && !lastMessage.isMyMessage) {
        let index = conversation.findIndex((x) => x["id"] === 4);
        let updateState = [...conversation];
        if (updateState.length && index > 0) {
          updateState[index]["lastText"] = lastMessage.text;
          updateState[index]["timeStamp"] = lastMessage.timeStamp;
          setConversation(
            uniqueById(
              updateState.sort((x, y) => {
                return y.timeStamp - x.timeStamp;
              })
            )
          );
        } else if (updateState.length < 1 || index < 0) {
          ConversationController.Search(searchTerm, 1)
            .then((res) => {
              setConversation(
                uniqueById(
                  res.sort((x, y) => {
                    return y.timeStamp - x.timeStamp;
                  })
                )
              );
            })
            .catch((err) => {});
        }
      } else if (lastMessage != null && lastMessage.isMyMessage) {
        let index = conversation.findIndex(
          (x) => x["id"] === lastMessage?.receiver
        );
        let updateState = [...conversation];
        if (updateState[index] && updateState[index]["lastText"]) {
          updateState[index]["lastText"] = lastMessage.text;
          updateState[index]["timeStamp"] = lastMessage.timeStamp;
          setConversation(
            uniqueById(
              updateState.sort((x, y) => {
                return y.timeStamp - x.timeStamp;
              })
            )
          );
        }
      }
    }
  }, [lastMessage, conversation, searchTerm]);

  return (
    <>
      <TextField
        fullWidth
        size="small"
        sx={{ p: 2 }}
        onChange={handleInputChange}
        placeholder="Search Conversations"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <AiOutlineSearch />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Divider />
      <List>
        {conversation.length ? (
          <>
            {conversation.map((item, idx) => (
              <React.Fragment key={idx}>
                <ListItem
                  sx={{
                    background: `${userId === item.id && "rgb(242, 242, 242)"}`,
                  }}
                  disablePadding
                  onClick={() => handleConversationClick(item)}
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <ActiveBadge isOnline={item.isOnline}>
                        <Avatar
                          src={`${BASE_URL}/${item.profilePic}`}
                          alt={item.name}
                        />
                      </ActiveBadge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          fontWeight="bold"
                          variant="subtitle2"
                          width={100}
                          noWrap
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        item.lastText.includes("http://res.cloudinary.com") ? (
                          <Typography
                            variant="subtitle2"
                            width={110}
                            fontWeight={item.isUnread ? "bold" : "normal"}
                            noWrap
                            style={{ color: item.isUnread ? "blue" : "black" }}
                          >
                            sent photo
                          </Typography>
                        ) : (
                          <Typography
                            variant="subtitle2"
                            width={110}
                            fontWeight={item.isUnread ? "bold" : "normal"}
                            noWrap
                            style={{ color: item.isUnread ? "blue" : "black" }}
                          >
                            {isJsonString(item.lastText)
                              ? JSON.parse(item.lastText)
                              : item.lastText}
                          </Typography>
                        )
                      }
                    />

                    {/* <ListItemText /> */}
                    <ListItemText
                      sx={{
                        position: "absolute",
                        top: 25,
                        right: 5,
                      }}
                      secondary={
                        <Typography
                          textAlign="right"
                          display="block"
                          variant="caption"
                          fontSize={12}
                        >
                          {format(item.timeStamp)}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            {searchTerm === "" && conversation.length >= 10 && (
              <Box pt={2} pb={3} textAlign={"center"}>
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  variant="contained"
                  disabled={!loadMore}
                >
                  Load More
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Typography variant="body2" textAlign="center" py={2}>
            No History
          </Typography>
        )}
      </List>
    </>
  );
}

export default React.memo(MessageList);
