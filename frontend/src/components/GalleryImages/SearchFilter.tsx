import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";

type SearchFilterProps = {
  initialQuery?: string;
  placeholder?: string;
  isLoading?: boolean;
  onSearch: (query: string) => void;
  onClear?: () => void;
};

export function SearchFilter({
  initialQuery = "",
  placeholder,
  isLoading = false,
  onSearch,
  onClear,
}: SearchFilterProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState(initialQuery);
  const resolvedPlaceholder = placeholder ?? t("searchFilter.placeholder");

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = () => {
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        width: "100%",
        maxWidth: 640,
      }}
    >
      <TextField
        fullWidth
        size="small"
        value={query}
        placeholder={resolvedPlaceholder}
        onChange={(e) => setQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label={t("searchFilter.clear")}
                  size="small"
                  onClick={handleClear}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ whiteSpace: "nowrap", minWidth: 100 }}
      >
        {isLoading ? t("searchFilter.searching") : t("searchFilter.search")}
      </Button>
    </Box>
  );
}
