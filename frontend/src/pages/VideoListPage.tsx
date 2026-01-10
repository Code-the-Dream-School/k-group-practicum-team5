import { Box } from "@mui/material";
import type { Video } from "@/types";
import VideoList from "@/components/VideoList";
import { LinkText } from "@/components/shared";
import YouTubeIcon from "@mui/icons-material/YouTube";

const videos: Video[] = [
  {
    id: "1",
    title: "Black Mamba",
    url: "https://www.youtube.com/embed/7rc4-8BxlFw",
    description:
      "The fastest and deadliest snake in the world, the black mamba",
  },
  {
    id: "2",
    title: "King Cobra",
    url: "https://www.youtube.com/embed/WdKLdPYsjf4",
    description: "The largest cobra in the world, the king cobra",
  },
  {
    id: "3",
    title: "Rattlesnakes",
    url: "https://www.youtube.com/embed/bq4wM7bNQiU",
    description:
      "Eastern Diamondback rattlesnake and Northern Pacific rattlesnake",
  },
  {
    id: "4",
    title: "Black Mamba",
    url: "https://www.youtube.com/embed/hDFNzZ7eIJM",
    description: "Black mamba strikes in slow motion",
  },
  {
    id: "5",
    title: "Albino Alligator",
    url: "https://www.youtube.com/embed/7HWjm-Go3vg",
    description:
      "The Reptile Zoo staff moves the rare albino American alligator, Baskar, to his new exhibit!",
  },
  {
    id: "6",
    title: "Gaboon Viper",
    url: "https://www.youtube.com/embed/NexhngpTyZE",
    description:
      "Watch the #2 deadliest snake -- with the largest fangs in the world, the Gaboon Viper, swallow his lunch...",
  },
  {
    id: "7",
    title: "Black Mamba",
    url: "https://www.youtube.com/embed/dPd6-VvfIXA",
    description: "The #1 deadliest snake in the world dispays his fangs!",
  },
  {
    id: "8",
    title: "Rattlesnake",
    url: "https://www.youtube.com/embed/ghl4qsTxIHA",
    description:
      "The Reptile Man gets up close to one of the only rattlesnakes native to the Pacific Northwest!",
  },
  {
    id: "9",
    title: "American Alligator",
    url: "https://www.youtube.com/embed/GroeI215PW8",
    description:
      "The Reptile Man brushes Barnabus' teeth and then feeds him a treat...",
  },
  {
    id: "10",
    title: "Baskar Bellows",
    url: "https://www.youtube.com/embed/bRQCiyS47j8",
    description:
      "American alligators, Baskar and Barnabus, bellow at one another before feeding on rodents",
  },
  {
    id: "11",
    title: "Green Anaconda",
    url: "https://www.youtube.com/embed/qRHeaBsR6aU",
    description:
      "The Reptile Zoo staff moves the massive anaconda to her new exhibit",
  },
];

const youtubeLink =
  "https://www.youtube.com/channel/UC6bmf-pkOksBR8RPddomb8w?sub_confirmation=1";

function VideoListPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        paddingY: 4,
        backgroundColor: "background.default",
      }}
    >
      <LinkText
        link={youtubeLink}
        text="Subscribe to The Reptile Zoo"
        icon={<YouTubeIcon color="error" />}
      />
      <VideoList videos={videos} />
    </Box>
  );
}

export default VideoListPage;
