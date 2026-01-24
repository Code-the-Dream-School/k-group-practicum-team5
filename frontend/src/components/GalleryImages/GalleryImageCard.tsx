import ImageListItem from "@mui/material/ImageListItem";
import type { Image } from "@/types";

type GalleryImageCardProps = {
  image: Image;
  onClick: (image: Image) => void;
};

export function GalleryImageCard({ image, onClick }: GalleryImageCardProps) {
  return (
    <ImageListItem
      role="listitem"
      key={image.asset_id}
      onClick={() => onClick(image)}
      sx={{
        cursor: "pointer",
        borderRadius: 2,
        m: 1,
        overflow: "hidden",
        transition: "all 0.35s",
        "&:hover": { transform: "translateY(-6px)" },
        "& img": { transition: "transform 0.35s" },
        "&:hover img": { transform: "scale(1.05)" },
      }}
    >
      <img
        src={image.url}
        alt={image.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </ImageListItem>
  );
}

export default GalleryImageCard;
