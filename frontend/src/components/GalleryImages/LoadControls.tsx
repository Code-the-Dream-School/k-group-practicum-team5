import { Box, Button } from "@mui/material";
import { SmallZooLoader } from "@/components/shared";

type LoadControlsProps = {
  isLoading: boolean;
  nextCursor: string | null;
  onLoadMore: () => void;
  onLoadAll: () => void;
};

export function LoadControls({
  isLoading,
  nextCursor,
  onLoadMore,
  onLoadAll,
}: LoadControlsProps) {
  if (!nextCursor) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Button
        variant="contained"
        onClick={onLoadMore}
        disabled={isLoading || !nextCursor}
        sx={{ minWidth: 150 }}
      >
        {isLoading ? <SmallZooLoader /> : "Load More"}
      </Button>
      <Button
        variant="outlined"
        onClick={onLoadAll}
        disabled={isLoading || !nextCursor}
        sx={{ minWidth: 150 }}
      >
        Load All
      </Button>
    </Box>
  );
}

export default LoadControls;
