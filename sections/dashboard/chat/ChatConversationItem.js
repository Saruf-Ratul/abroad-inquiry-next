import { format } from "timeago.js";
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BadgeStatus from "../../../components/BadgeStatus";
import { BASE_URL } from "@/utils/axios";
import { isJsonString } from "@/utils/isJsonString";

const AVATAR_SIZE = 48;

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  transition: theme.transitions.create("all"),
}));



export default function ChatConversationItem({
  isSelected,
  conversation,
  onSelectConversation,
  isOpenSidebar,
}){


  return (
    <RootStyle
      disableGutters
      onClick={onSelectConversation}
      sx={{
        ...(isSelected && { bgcolor: "action.selected" }),
      }}
    >
      <ListItemAvatar>
        <Box sx={{ position: "relative" }}>
          <Avatar
            alt={conversation.name}
            src={`${BASE_URL}/${conversation.profilePic}`}
          />

          <BadgeStatus
            status="online"
            sx={{ position: "absolute", right: 2, bottom: 2 }}
          />
        </Box>
      </ListItemAvatar>

      {isOpenSidebar && (
        <>
          <ListItemText
            primary={conversation.name}
            primaryTypographyProps={{
              noWrap: true,
              variant: "subtitle2",
            }}
            secondary={
              conversation?.lastText?.includes(
                "http://res.cloudinary.com/dktbmmmym/image/upload"
              )
                ? "sent photo"
                : conversation?.lastText?.includes(
                    "http://res.cloudinary.com/dktbmmmym/video/upload"
                  )
                ? "sent voice"
                : isJsonString(conversation?.lastText)
                ? JSON.parse(conversation?.lastText)
                : conversation?.lastText
            }
            secondaryTypographyProps={{
              noWrap: true,
              variant: conversation?.isUnread ? "subtitle2" : "caption",
              color: conversation?.isUnread ? "textPraimary" : "textSecondary",
              fontWeight: conversation?.isUnread ? "bold" : "300"
            }}
          />

          <Box
            sx={{
              ml: 2,
              height: 44,
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mb: 1.25,
                fontSize: 12,
                lineHeight: "22px",
                whiteSpace: "nowrap",
                color: "text.disabled",
              }}
            >
               {format(conversation.timeStamp)}
            </Box>
            {/* <BadgeStatus status="unread" size="small" /> */}
          </Box>
        </>
      )}
    </RootStyle>
  );
}
