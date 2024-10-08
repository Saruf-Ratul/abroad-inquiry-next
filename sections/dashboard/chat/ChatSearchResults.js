import SearchNotFound from "../../../components/SearchNotFound";
import { formatDistanceToNowStrict } from "date-fns";
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
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";
import { format } from "timeago.js";

const AVATAR_SIZE = 48;

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  transition: theme.transitions.create("all"),
}));

const AvatarWrapperStyle = styled("div")(() => ({
  position: "relative",
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  "& .MuiAvatar-img": { borderRadius: "50%" },
  "& .MuiAvatar-root": { width: "100%", height: "100%" },
}));

export default function ChatSearchResults({ query, results, handleConversationClick }) {
  const router = useRouter();
  const isFound = results.length > 0;

  return (
    <>
      {!isFound && (
        <SearchNotFound
          searchQuery={query}
          sx={{
            p: 3,
            mx: "auto",
            width: `calc(100% - 48px)`,
            bgcolor: "background.neutral",
          }}
        />
      )}

      {results.map((conversation) => (
        <RootStyle
          disableGutters
          onClick={() =>
            handleConversationClick(conversation)
          }
        >
          <ListItemAvatar>
            <Box>
              <AvatarWrapperStyle
                className="avatarWrapper"
                key={conversation.id}
              >
                <Avatar
                  alt={conversation.name}
                  src={`${BASE_URL}/${conversation.profilePic}`}
                />
                <BadgeStatus
                  status={conversation.userStatus}
                  sx={{ right: 2, bottom: 2, position: "absolute" }}
                />
              </AvatarWrapperStyle>
            </Box>
          </ListItemAvatar>

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
              // variant: isUnread ? "subtitle2" : "body2",
              // color: isUnread ? "textPrimary" : "textSecondary",
              variant: "subtitle2",
              color: "textSecondary",
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
            <BadgeStatus status="unread" size="small" />
          </Box>
        </RootStyle>
      ))}
    </>
  );
}
