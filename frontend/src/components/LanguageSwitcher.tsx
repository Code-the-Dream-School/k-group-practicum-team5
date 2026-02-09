import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const storageKey = "i18nextLng";

  useEffect(() => {
    const storedLanguage = localStorage.getItem(storageKey);

    if (!storedLanguage) {
      localStorage.setItem(storageKey, "en");
      i18n.changeLanguage("en");
    }
  }, [i18n]);

  const languages = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      size="small"
      sx={{
        color: "primary.contrastText",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "primary.contrastText",
        },
        "& .MuiSvgIcon-root": {
          color: "primary.contrastText",
        },
      }}
    >
      {languages.map((lang) => (
        <MenuItem key={lang.code} value={lang.code}>
          {lang.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
