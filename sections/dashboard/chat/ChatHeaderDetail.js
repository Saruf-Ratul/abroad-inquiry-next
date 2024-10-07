import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BadgeStatus from "../../../components/BadgeStatus";
import Iconify from "../../../components/Iconify";
import { BASE_URL } from "@/utils/axios";
import { SkeletonConversationItem } from "../../../components/skeleton";

const RootStyle = styled("div")(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 3),
}));

export default function ChatHeaderDetail({ chatUser, loading }) {
  return (
    <RootStyle>
      <OneAvatar chatUser={chatUser} loading={loading} />
      <Box sx={{ flexGrow: 1 }} />
      <IconButton>
        <Iconify icon="eva:phone-fill" width={20} height={20} />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:video-fill" width={20} height={20} />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
    </RootStyle>
  );
}

function OneAvatar({ chatUser, loading }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {!chatUser?.name ? (
        <Box sx={{ ml: 2, width: "300px" }}>
          <SkeletonConversationItem />
        </Box>
      ) : (
        <div style={{ display: "flex" }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={`${BASE_URL}/${chatUser.profilePic}`}
              alt={chatUser?.name}
            />
            <BadgeStatus
              status="online"
              sx={{ position: "absolute", right: 2, bottom: 2 }}
            />
          </Box>

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2">{chatUser?.name}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              online
            </Typography>
          </Box>
        </div>
      )}
    </Box>
  );
}
