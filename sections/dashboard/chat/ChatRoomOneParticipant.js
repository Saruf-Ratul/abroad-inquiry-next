import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../../../components/Iconify";
import { BASE_URL } from "@/utils/axios";
import { SkeletonConversationItem } from "@/components/skeleton";

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...theme.typography.overline,
  height: 40,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: "space-between",
  color: theme.palette.text.disabled,
}));

const RowStyle = styled("div")(({ theme }) => ({
  display: "flex",
  margin: theme.spacing(1.5, 0),
}));

const RowTextStyle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: "100%",
  marginLeft: "5px",
  wordWrap: "break-word",
  ...theme.typography.body2,
}));

export default function ChatRoomOneParticipant({
  isCollapse,
  onCollapse,
  conversationKey,
  details,
  loading,
}) {
  return (
    <>
      {loading ? (
        <SkeletonConversationItem />
      ) : (
        <div>
          <Box
            sx={{
              pt: 4,
              pb: 3,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              alt={details.name}
              src={`${BASE_URL}/${details.avatar}`}
              sx={{ width: 96, height: 96 }}
            />
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="subtitle1">{details?.name}</Typography>
            </Box>
          </Box>
          <Divider />
          <CollapseButtonStyle
            fullWidth
            color="inherit"
            onClick={onCollapse}
            endIcon={
              <Iconify
                icon={
                  isCollapse
                    ? "eva:arrow-ios-downward-fill"
                    : "eva:arrow-ios-forward-fill"
                }
                width={16}
                height={16}
              />
            }
          >
            information
          </CollapseButtonStyle>
          <Collapse in={isCollapse}>
            <Box sx={{ px: 2.5, pb: 1 }}>
              <RowStyle>
                <Iconify
                  icon={"heroicons-outline:mail"}
                  width={18}
                  height={18}
                  style={{
                    marginTop: "3px",
                  }}
                />
                <RowTextStyle>{details.email}</RowTextStyle>
              </RowStyle>
            </Box>
          </Collapse>
        </div>
      )}
    </>
  );
}
