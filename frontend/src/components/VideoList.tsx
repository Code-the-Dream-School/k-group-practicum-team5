import { Grid, Box } from "@mui/material";
import VideoCard from "@/components/VideoCard";
import type { Video } from "@/types";
import { InfoAlert } from "@/components/alert";

interface VideoListProps {
  videos: Video[];
}

function VideoList({ videos }: VideoListProps) {
  const isEmptyVideos = !videos || videos.length === 0;

  return (
    <Box
      sx={{
        maxHeight: "80vh",
        overflowY: "auto",
        overflowX: "hidden",
        paddingX: 4,
        paddingY: 2,
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 3, sm: 8, md: 12, lg: 16 }}
        marginTop={2}
        marginBottom={2}
      >
        {isEmptyVideos ? (
          <InfoAlert message="Looks like this gallery doesn’t have any videos yet" />
        ) : (
          videos.map((video: Video) => (
            <Grid key={video.id} size={{ xs: 3, sm: 4, md: 4 }}>
              <VideoCard video={video} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default VideoList;
