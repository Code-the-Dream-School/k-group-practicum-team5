import { Box, Button } from "@mui/material";
import { SmallZooLoader } from "@/components/shared";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        {isLoading ? <SmallZooLoader /> : t("loadControls.loadMore")}
      </Button>
      <Button
        variant="outlined"
        onClick={onLoadAll}
        disabled={isLoading || !nextCursor}
        sx={{ minWidth: 150 }}
      >
        {t("loadControls.loadAll")}
      </Button>
    </Box>
  );
}

export default LoadControls;
