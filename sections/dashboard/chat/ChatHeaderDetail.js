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

export default function ChatHeaderDetail({
  chatUser
}) {
  return (
    <RootStyle>
      <OneAvatar chatUser={chatUser} />
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

function OneAvatar({ chatUser }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ position: "relative" }}>
        {/* {loading ? (
          <SkeletonConversationItem />
        ) : ( */}
          <>
            <Avatar src={`${BASE_URL}/${chatUser.profilePic}`} alt={chatUser.name} />
            <BadgeStatus
              status="online"
              sx={{ position: "absolute", right: 2, bottom: 2 }}
            />
          </>
        {/* )} */}
      </Box>
      {/* {!loading && ( */}
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{chatUser?.name}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            online
          </Typography>
        </Box>
      {/* )} */}
    </Box>
  );
}
