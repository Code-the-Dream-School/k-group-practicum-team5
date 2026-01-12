import { useTheme, useMediaQuery } from "@mui/material";
import { Pagination, Box } from "@mui/material";

interface PaginatedImageGalleryProps {
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginatedImageGallery({
  page,
  totalPages,
  onPageChange,
}: PaginatedImageGalleryProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        mb: 4,
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={onPageChange}
        color="primary"
        size={isMobile ? "medium" : "large"}
        showFirstButton
        showLastButton
      />
    </Box>
  );
}
