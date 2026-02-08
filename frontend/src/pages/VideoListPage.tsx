import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { Video } from "@/types";
import VideoList from "@/components/VideoList";
import { LinkText } from "@/components/shared";
import YouTubeIcon from "@mui/icons-material/YouTube";

const videoItems = [
  {
    id: "1",
    url: "https://www.youtube.com/embed/7rc4-8BxlFw",
    titleKey: "videos.items.1.title",
    descriptionKey: "videos.items.1.description",
  },
  {
    id: "2",
    url: "https://www.youtube.com/embed/WdKLdPYsjf4",
    titleKey: "videos.items.2.title",
    descriptionKey: "videos.items.2.description",
  },
  {
    id: "3",
    url: "https://www.youtube.com/embed/bq4wM7bNQiU",
    titleKey: "videos.items.3.title",
    descriptionKey: "videos.items.3.description",
  },
  {
    id: "4",
    url: "https://www.youtube.com/embed/hDFNzZ7eIJM",
    titleKey: "videos.items.4.title",
    descriptionKey: "videos.items.4.description",
  },
  {
    id: "5",
    url: "https://www.youtube.com/embed/7HWjm-Go3vg",
    titleKey: "videos.items.5.title",
    descriptionKey: "videos.items.5.description",
  },
  {
    id: "6",
    url: "https://www.youtube.com/embed/NexhngpTyZE",
    titleKey: "videos.items.6.title",
    descriptionKey: "videos.items.6.description",
  },
  {
    id: "7",
    url: "https://www.youtube.com/embed/dPd6-VvfIXA",
    titleKey: "videos.items.7.title",
    descriptionKey: "videos.items.7.description",
  },
  {
    id: "8",
    url: "https://www.youtube.com/embed/ghl4qsTxIHA",
    titleKey: "videos.items.8.title",
    descriptionKey: "videos.items.8.description",
  },
  {
    id: "9",
    url: "https://www.youtube.com/embed/GroeI215PW8",
    titleKey: "videos.items.9.title",
    descriptionKey: "videos.items.9.description",
  },
  {
    id: "10",
    url: "https://www.youtube.com/embed/bRQCiyS47j8",
    titleKey: "videos.items.10.title",
    descriptionKey: "videos.items.10.description",
  },
  {
    id: "11",
    url: "https://www.youtube.com/embed/qRHeaBsR6aU",
    titleKey: "videos.items.11.title",
    descriptionKey: "videos.items.11.description",
  },
];

const youtubeLink =
  "https://www.youtube.com/channel/UC6bmf-pkOksBR8RPddomb8w?sub_confirmation=1";

function VideoListPage() {
  const { t } = useTranslation();
  const videos: Video[] = videoItems.map((item) => ({
    id: item.id,
    url: item.url,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        paddingY: 4,
        backgroundColor: "background.default",
        border: 0,
        minHeight: "100vh",
      }}
    >
      <LinkText
        link={youtubeLink}
        text={t("videos.subscribe")}
        icon={<YouTubeIcon color="error" />}
      />
      <VideoList videos={videos} />
    </Box>
  );
}

export default VideoListPage;
