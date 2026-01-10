import { Box, CardContent, Typography } from "@mui/material";
import StyledVideoCard from "./StyledVideoCard.styles";
import type { Video } from "@/types";

function VideoCard({ video }: { video: Video }) {
  const { url, title, description } = video;
  return (
    <StyledVideoCard>
      <Box
        sx={{
          width: "100%",
          transform: "scale(0.9)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <iframe
          src={url}
          title={title}
          allowFullScreen
          style={{
            width: "100%",
            height: "350px",
            border: 0,
          }}
        />
      </Box>

      <CardContent sx={{ padding: 1 }}>
        <Typography variant="subtitle2" color="primary.main" noWrap>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </StyledVideoCard>
  );
}
export default VideoCard;
