import { Grid, Box } from "@mui/material";
import VideoCard from "@/components/VideoCard";
import type { Video } from "@/types";
import { InfoAlert } from "@/components/alert";
import { useTranslation } from "react-i18next";

interface VideoListProps {
  videos: Video[];
}

function VideoList({ videos }: VideoListProps) {
  const { t } = useTranslation();
  const isEmptyVideos = !videos || videos.length === 0;

  return (
    <Box
      sx={{
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
          <InfoAlert message={t("videos.empty")} />
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
