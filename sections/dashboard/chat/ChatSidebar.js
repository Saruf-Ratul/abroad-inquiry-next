"use client";
import { useEffect, useState } from "react";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useResponsive from "@/hooks/useResponsive";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import ChatContactSearch from "./ChatContactSearch";
import ChatConversationList from "./ChatConversationList";
import ChatSearchResults from "./ChatSearchResults";
import { useUser } from "@/contexts/UserContext";
import io from "socket.io-client";
import { debounce } from "lodash";
import ConversationController from "@/services/controllers/conversation";
import { UPDATE_CONVERSATION } from "@/services/mentorRequests";
import { useRouter } from "next/navigation";

const ToggleButtonStyle = styled((props) => (
  <IconButton disableRipple {...props} />
))(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.customShadows.primary,
  "&:hover": {
    backgroundColor: theme.palette.primary.darker,
  },
}));

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function ChatSidebar({ lastMessage, setLastMessage, chatUser }) {
  const theme = useTheme();
  const router = useRouter();
  const { user, lastMsg } = useUser();
  const [loggedInUser, setLoggedInUser] = user;
  const [conversation, setConversation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchActive, setFetchActive] = useState(false);
  const [page, setPage] = useState(1); // Handle page for pagination
  const [loadMore, setLoadMore] = useState(true); // Control "Load More" state
  const isDesktop = useResponsive("up", "md");
  const displayResults = searchTerm.length > 0;
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isSearchFocused, setSearchFocused] = useState(false);

  const isCollapse = isDesktop && !openSidebar;

  const socket = io("https://realtime.abroadinquiry.com:2096", {
    path: "/socket.io",
    secure: true,
  });

  function uniqueById(items) {
    const set = new Set();
    return items.filter((item) => {
      const isDuplicate = set.has(item.id);
      set.add(item.id);
      return !isDuplicate;
    });
  }

  // Fetch conversations based on searchTerm and page
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
            setConversation((prevConversations) =>
              uniqueById([
                ...prevConversations,
                ...res.sort((x, y) => y.timeStamp - x.timeStamp),
              ])
            );
          } else {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => {
        setLoadMore(false);
      });
  }, [searchTerm, page]);

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
    }
    if (user.length) {
      socket.emit("sendUsers", {
        sender: loggedInUser.userStatus.concat(loggedInUser.id),
        users: users,
      });
    }
  };

  useEffect(() => {
    getActiveUsers();
  }, [fetchActive]);

  useEffect(() => {
    let callBack = (data) => {
      setLastMessage(data);
    };

    socket?.on("getMessage", callBack);

    return () => {
      socket?.off("getMessage", callBack);
    };
  }, [socket]);

  const handleConversationClick = async (item) => {
    item.isUnread = false;
    const index = conversation.findIndex((x) => x.id === item.id);
    if (index !== -1) {
      const updatedConversation = [...conversation];
      updatedConversation[index].isUnread = false;
      setConversation(updatedConversation);
    }

    try {
      await UPDATE_CONVERSATION({
        conversation: item.chatDetails,
        user: loggedInUser.id,
      });
    } catch (error) {
      console.error(error);
    }

    router.push(
      `${
        loggedInUser.userStatus === "mentor"
          ? "/dashboard/message/student/"
          : "/dashboard/message/mentor/"
      }${item.id}`
    );
  };

  // Updated useEffect to update conversation with the lastMessage
  useEffect(() => {
    if (conversation.length && lastMessage != null && !lastMessage.isMyMessage) {
      let index = conversation.findIndex(
        (x) => x["id"] === lastMessage.chatId
      ); // Use chatId instead of fixed id (4)

      if (index !== -1) {
        let updatedState = [...conversation];
        updatedState[index]["lastText"] = lastMessage.text; // Update the last text
        updatedState[index]["timeStamp"] = lastMessage.timeStamp; // Update the timestamp

        // Sort the conversations based on the updated timestamps
        setConversation(
          uniqueById(updatedState.sort((x, y) => y.timeStamp - x.timeStamp))
        );
      }
    }
  }, [lastMessage, conversation, searchTerm]);

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchTerm("");
  };

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event.target;
      setSearchTerm(value);
    } catch (error) {
      // console.error(error);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const renderContent = (
    <>
      <Box sx={{ py: 2, px: 3 }}>
        {!isCollapse && (
          <ChatContactSearch
            query={searchTerm}
            onFocus={handleSearchFocus}
            onChange={handleChangeSearch}
            onClickAway={handleClickAwaySearch}
          />
        )}
      </Box>

      <Scrollbar>
        {displayResults ? (
          <ChatSearchResults
            query={searchTerm}
            setSearchQuery={setSearchTerm}
            results={conversation}
            handleConversationClick={handleConversationClick}
          />
        ) : (
          <ChatConversationList
            lastMessage={lastMessage}
            setLastMessage={setLastMessage}
            conversations={conversation}
            handleConversationClick={handleConversationClick}
            isOpenSidebar={openSidebar}
            chatUser={chatUser}
          />
        )}
      </Scrollbar>

      <Box pt={2} pb={3} textAlign={"center"}>
        {searchTerm === "" && conversation.length >= 10 && (
          <Button
            onClick={() => setPage((prev) => prev + 1)} // Increment page
            variant="contained"
            disabled={!loadMore} // Disable if no more data
          >
            Load More
          </Button>
        )}
      </Box>
    </>
  );

  return (
    <>
      {!isDesktop && (
        <ToggleButtonStyle onClick={() => setOpenSidebar(!openSidebar)}>
          <Iconify width={16} height={16} icon={"eva:people-fill"} />
        </ToggleButtonStyle>
      )}

      {isDesktop ? (
        <Drawer
          open={openSidebar}
          variant="persistent"
          sx={{
            width: SIDEBAR_WIDTH,
            transition: theme.transitions.create("width"),
            "& .MuiDrawer-paper": {
              position: "static",
              width: SIDEBAR_WIDTH,
            },
            ...(isCollapse && {
              width: SIDEBAR_COLLAPSE_WIDTH,
              "& .MuiDrawer-paper": {
                width: SIDEBAR_COLLAPSE_WIDTH,
                position: "static",
                transform: "none !important",
                visibility: "visible !important",
              },
            }),
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          sx={{
            "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
