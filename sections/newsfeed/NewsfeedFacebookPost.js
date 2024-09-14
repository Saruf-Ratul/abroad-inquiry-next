import Iconify from "@/components/Iconify";
import {
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
} from "@mui/material";

function NewsfeedFacebookPost() {
    const matchesMd = useMediaQuery("(max-width:900px)");

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: "12px" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight="bold">
                Facebook Posts
              </Typography>
              <Button
                variant="contained"
                startIcon={
                  <Iconify icon="mdi:facebook" width={20} height={20} />
                }
                href="https://www.facebook.com/Abroadinquiry"
                target="_blank"
                rel="noopener noreferrer"
               
              
              >
                Visit Page
              </Button>
            </Box>
            <Divider sx={{ marginY: 2 }} />

            <Box>
              <iframe
                src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAbroadinquiry&tabs=timeline&width=${
                  matchesMd ? "100%" : "850"
                }&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                width="100%"
                height="850"
                style={{
                  border: "none",
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewsfeedFacebookPost;