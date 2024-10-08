"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useResponsive from "@/hooks/useResponsive";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import ChatContactSearch from "./ChatContactSearch";
import ChatConversationList from "./ChatConversationList";
import ChatSearchResults from "./ChatSearchResults";
import { useUser } from "@/contexts/UserContext";
import ConversationController from "@/services/controllers/conversation";
import { UPDATE_CONVERSATION } from "@/services/mentorRequests";
import { useRouter } from "next/navigation";
import { CREATE_NEW_CONVERSATION_CALL } from "@/services/conversationRequest";
import { updateConversationRead } from "@/redux/features/chat/chatSlice";

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

export default function ChatSidebar({
  lastMessage,
  setLastMessage,
  chatUser,
  userStatus,
  userId,
  setChatUser,
  setChatUserCode,
}) {
  const theme = useTheme();
  const router = useRouter();
  const { user, lastMsg } = useUser();
  const [loggedInUser, setLoggedInUser] = user;
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const isDesktop = useResponsive("up", "md");
  const displayResults = searchTerm.length > 0;
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const isCollapse = isDesktop && !openSidebar;

  useEffect(() => {
    if (
      userStatus !== loggedInUser.userStatus &&
      userStatus &&
      userId &&
      lastMessage?.text != null
    ) {
      const newConversationData = {
        mentorId:
          userStatus === "mentor" ? Number(userId) : Number(loggedInUser.id),
        studentId:
          userStatus === "student" ? Number(userId) : Number(loggedInUser.id),
      };

      CREATE_NEW_CONVERSATION_CALL(newConversationData)
        .then((newConversation) => {
          const updatedConversation = {
            id: newConversation?.data?.id,
            chatDetails: newConversation?.data?.chatDetails,
            lastText: newConversation?.data?.lastText,
            name: newConversation?.data?.name,
            profilePic: newConversation?.data?.profilePic,
            timeStamp: new Date().getTime(),
            isUnread: false,
          };
          setChatUser(newConversation.data);
          setChatUserCode(
            userStatus == "mentor"
              ? "student".concat(newConversation.data.id)
              : "mentor".concat(newConversation.data.id)
          );

          setConversations((prevConversations) => {
            const updatedConversations = prevConversations.map((conv) => {
              if (conv.id === newConversation?.data?.id) {
                return {
                  ...conv, 
                  lastText: newConversation?.data?.lastText,
                  timeStamp: new Date().getTime(),
                };
              }
              return conv;
            });
            const isUpdated = updatedConversations.some(
              (conv) => conv.id === newConversation?.data?.id
            );
            if (!isUpdated) {
              updatedConversations.push(updatedConversation);
            }
            return updatedConversations.sort(
              (a, b) => b.timeStamp - a.timeStamp
            );
          });
        })
        .catch((error) => {
          console.error("Error creating conversation:", error);
        });
    }
  }, [
    userStatus,
    userId,
    lastMessage?.text,
    loggedInUser.userStatus,
    chatUser?.id,
  ]);

  function uniqueById(items) {
    const set = new Set();
    return items.filter((item) => {
      const isDuplicate = set.has(item.id);
      set.add(item.id);
      return !isDuplicate;
    });
  }

  // Fetch conversations
  useEffect(() => {
    setIsLoading(true);
    ConversationController.Search(searchTerm, page)
      .then((res) => {
        if (searchTerm) {
          setConversations(
            uniqueById(
              res.sort((x, y) => {
                return y.timeStamp - x.timeStamp;
              })
            )
          );
        } else {
          if (res?.length) {
            setConversations((prevConversations) =>
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchTerm, page]);

  const handleConversationClick = async (item) => {
    item.isUnread = false;
    const index = conversations.findIndex((x) => x.id === item.id);
    if (index !== -1) {
      const updatedConversation = [...conversations];
      updatedConversation[index].isUnread = false;
      setConversations(updatedConversation);
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

  useEffect(() => {
    if (conversations.length && lastMessage?.text != null) {
      const index = conversations.findIndex(
        (conv) => conv.chatDetails === lastMessage.chatId
      );

      if (index !== -1) {
        let updatedConversations = [...conversations];
        if (
          updatedConversations[index].lastText !== lastMessage.text ||
          updatedConversations[index].timeStamp !== lastMessage.timeStamp
        ) {
          updatedConversations[index].lastText = lastMessage.text;
          updatedConversations[index].timeStamp = lastMessage.timeStamp;
          updatedConversations = updatedConversations.sort(
            (a, b) => b.timeStamp - a.timeStamp
          );
          setConversations(updatedConversations);
        }
      }
    }
  }, [lastMessage, conversations]);

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
            results={conversations}
            handleConversationClick={handleConversationClick}
          />
        ) : (
          <ChatConversationList
            lastMessage={lastMessage}
            setLastMessage={setLastMessage}
            conversations={conversations}
            handleConversationClick={handleConversationClick}
            isOpenSidebar={openSidebar}
            chatUser={chatUser}
          />
        )}
      </Scrollbar>

      <Box pt={2} pb={3} textAlign={"center"}>
        {isLoading ? (
          <Button variant="contained" disabled>
            Loading....
          </Button>
        ) : (
          searchTerm === "" &&
          conversations.length >= 10 && (
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              variant="contained"
              disabled={!loadMore}
            >
              Load More
            </Button>
          )
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
