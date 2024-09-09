"use client";
import { useEffect, useState } from "react";
import { Box, Button, Drawer, IconButton, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  fetchSearchMessage,
} from "@/redux/features/chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import useResponsive from "@/hooks/useResponsive";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import ChatContactSearch from "./ChatContactSearch";
import ChatConversationList from "./ChatConversationList";
import ChatSearchResults from "./ChatSearchResults";


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

export default function ChatSidebar({lastMessage,conversationKey}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const isDesktop = useResponsive("up", "md");
  const displayResults = searchQuery.length > 0;
  const isCollapse = isDesktop && !openSidebar;
  const { loading, searchedMessages } = useSelector((state) => state.chat);

   useEffect(() => {
    if (page || searchQuery) {
      dispatch(fetchSearchMessage({ keyword: searchQuery, pageNumber: page }));
    }
  }, [dispatch, page, searchQuery]);


  useEffect(() => {
    if (!openSidebar) {
      return setSearchFocused(false);
    }
  }, [openSidebar]);

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchQuery("");
  };

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      if (value) {
        const filteredContacts = Object.values(contacts.byId).filter(
          (contact) => contact.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredContacts);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      // console.error(error);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchSelect = (contactId) => {
    setSearchFocused(false);
    setSearchQuery("");
  };

  const handleSelectContact = (contact) => {
    handleSearchSelect(contact.id);
  };

  const renderContent = (
    <>
      <Box sx={{ py: 2, px: 3 }}>
        {!isCollapse && (
          <ChatContactSearch
            query={searchQuery}
            onFocus={handleSearchFocus}
            onChange={handleChangeSearch}
            onClickAway={handleClickAwaySearch}
          />
        )}
      </Box>

      <Scrollbar>
        {displayResults ? (
          <ChatSearchResults
            query={searchQuery}
            setSearchQuery={setSearchQuery}
            results={searchedMessages}
            onSelectContact={handleSelectContact}
          />
        ) : (
          <ChatConversationList
           conversationKey={conversationKey}
            lastMessage={lastMessage}
            conversations={searchedMessages}
            loading={loading}
            isOpenSidebar={openSidebar}
            sx={{ ...(isSearchFocused && { display: "none" }) }}
          />
        )}
      </Scrollbar>

      <Box pt={2} pb={3} textAlign={"center"}>
        <Button onClick={() => setPage((prev) => prev + 1)} variant="contained">
          Load More
        </Button>
      </Box>
    </>
  );

  return (
    <>
      {!isDesktop && (
        <ToggleButtonStyle onClick={handleToggleSidebar}>
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
          onClose={handleCloseSidebar}
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
