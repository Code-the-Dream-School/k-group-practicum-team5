import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  Select,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Stack,
  Button,
} from "@mui/material";
import { apiCall } from "../../../api/axios";
import Schedule from "@/pages/volunteering/admin/Schedule";
import { SectionHeading } from "@/components/GalleryImages";
import type { AvailabilityFormValue } from "@/types/volunteering/AvailabilityFormValue.type";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import { useTranslation } from "react-i18next";

// Icons
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import type { AxiosError } from "axios";

type Opportunity = {
  category?: string | null;
  description?: string | null;
  schedules?: {
    date: string | null;
    timeFrom: string | null;
    timeTo: string | null;
    slotsAvailable: number;
  }[];
};

export default function NewVolunteeringOpportunity() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [opportunity, setOpportunity] = useState({
    category: "",
    description: "",
  });
  const [schedules, setSchedules] = useState<AvailabilityFormValue[]>([
    {
      date: null,
      timeFrom: null,
      timeTo: null,
      slotsAvailable: 1,
    },
  ]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiCall<string[]>(
          "get",
          `${import.meta.env.VITE_API_BASE_URL}/volunteering/enums/categories`,
        );
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const opportunityData: Opportunity = {
      ...opportunity,
      schedules: schedules.map((s) => ({
        date: s.date ? s.date.toISOString() : null,
        timeFrom: s.timeFrom ? s.timeFrom.toISOString() : null,
        timeTo: s.timeTo ? s.timeTo.toISOString() : null,
        slotsAvailable: s.slotsAvailable,
      })),
    };

    try {
      setIsSaving(true);
      await apiCall<{ data: { id: string } }>(
        "post",
        `${import.meta.env.VITE_API_BASE_URL}/volunteering/new`,
        opportunityData,
      );

      setSuccessMessage(t("volunteeringAdmin.newOpportunity.success"));
      setErrorMessage(null);
      setTimeout(() => {
        setSuccessMessage(null);
        setIsSaving(false);
      }, 3000);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error creating opportunity:", error);
      const axiosError = error as AxiosError<{
        message?: string;
        errors?: string[];
        data?: object;
        error?: string[];
      }>;
      const errorDetail =
        axiosError.response?.data.error ||
        axiosError.response?.data?.message ||
        axiosError.message ||
        "An unexpected error occurred.";
      setErrorMessage(`${errorDetail}`);
      setSuccessMessage(null);
      setIsSaving(false);
    }
  };

  const menuPropsSx = {
    borderRadius: "0.5rem",
    "& .MuiMenuItem-root": {
      fontWeight: "bold",
      color: "primary.main",
    },
    "& .MuiMenuItem-root:hover": {
      bgcolor: "primary.light",
      color: "white",
    },
    "& .MuiMenuItem-root.Mui-selected": {
      bgcolor: "primary.main",
      color: "white",
    },
    "& .MuiMenuItem-root.Mui-selected:hover": {
      bgcolor: "primary.dark",
    },
  };

  return (
    <Box
      className="min-h-screen flex flex-col px-4"
      bgcolor={"background.default"}
    >
      {/* Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSaving}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6">
          &nbsp;{t("volunteeringAdmin.newOpportunity.saving")}
        </Typography>
      </Backdrop>

      {/* Alerts */}
      {successMessage && (
        <Slide
          direction="down"
          in={!!successMessage}
          mountOnEnter
          unmountOnExit
        >
          <Box
            mt={2}
            position={"absolute"}
            top={60}
            justifyContent={"center"}
            display={"flex"}
            width={"100%"}
            zIndex={100}
          >
            <Alert
              severity="success"
              variant="filled"
              sx={{
                paddingRight: 5,
                borderRadius: 0.5,
                bgcolor: "primary.main",
                boxShadow: 10,
              }}
            >
              <AlertTitle>
                <strong>
                  {t("volunteeringAdmin.newOpportunity.alerts.successTitle")}
                </strong>
              </AlertTitle>
              {successMessage}
            </Alert>
          </Box>
        </Slide>
      )}
      {errorMessage && (
        <Slide direction="down" in={!!errorMessage} mountOnEnter unmountOnExit>
          <Box
            mt={2}
            position={"absolute"}
            top={60}
            justifyContent={"center"}
            display={"flex"}
            width={"100%"}
            zIndex={100}
          >
            <Alert
              onClose={() => {
                setErrorMessage(null);
              }}
              severity="error"
              variant="filled"
              sx={{
                paddingRight: 3,
                borderRadius: 0.5,
                bgcolor: "error.dark",
                boxShadow: 10,
              }}
            >
              <AlertTitle>
                <strong>
                  {t("volunteeringAdmin.newOpportunity.alerts.errorTitle")}
                </strong>
              </AlertTitle>
              {errorMessage}
            </Alert>
          </Box>
        </Slide>
      )}

      {/* Header */}
      <Box sx={{ textAlign: { xs: "left", sm: "center" }, my: 1 }}>
        <SectionHeading
          title={t("volunteeringAdmin.newOpportunity.title")}
          fontSize={{ xs: "1rem", sm: "1.5rem", md: "1.5rem" }}
        />
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Box
          border={0.1}
          borderColor={"primary.light"}
          borderRadius={1}
          padding={4}
          boxShadow={1}
        >
          {/* Select Category */}
          <Box display={"flex"} border={0} alignItems={"end"}>
            <FormControl size="small">
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setOpportunity({ ...opportunity, category: e.target.value });
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <CategoryIcon fontSize="small" />
                    <Typography
                      variant="body1"
                      color="primary.main"
                      ml={1}
                      fontWeight={"bold"}
                    >
                      {t("volunteeringAdmin.newOpportunity.categoryLabel")}
                    </Typography>
                    {category === "" && (
                      <Typography
                        variant="body2"
                        color="primary.main"
                        ml={1}
                        sx={{ opacity: 0.7 }}
                      >
                        {t(
                          "volunteeringAdmin.newOpportunity.categoryPlaceholder",
                        )}
                      </Typography>
                    )}
                  </InputAdornment>
                }
                sx={{
                  color: "primary.main",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& .MuiSelect-icon": {
                    color: "primary.main",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: menuPropsSx,
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack
              direction="row"
              spacing={2}
              marginLeft={"auto"}
              position={"relative"}
              top={-7}
              mr={0.5}
              display={{ xs: "none", sm: "flex" }}
            >
              <Button
                variant="outlined"
                size="medium"
                type="button"
                sx={{ borderRadius: 0.8, width: 150 }}
                startIcon={<CancelIcon />}
                onClick={() => {
                  window.location.reload();
                }}
                disabled={
                  opportunity.category === "" ||
                  opportunity.description === "" ||
                  (schedules.length === 1 && schedules[0].date === null)
                }
              >
                {t("volunteeringAdmin.newOpportunity.reset")}
              </Button>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{ borderRadius: 0.8, width: 150 }}
                startIcon={<SaveIcon />}
                disabled={
                  opportunity.category === "" ||
                  opportunity.description === "" ||
                  (schedules.length === 1 && schedules[0].date === null) ||
                  isSaving
                }
              >
                {t("volunteeringAdmin.newOpportunity.save")}
              </Button>
            </Stack>
          </Box>

          {/* Description */}
          <Box
            border={1.5}
            marginTop={1}
            borderRadius={1}
            borderColor={"primary.main"}
          >
            <Box
              bgcolor={"primary.light"}
              sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
            >
              <Typography
                color="white"
                marginLeft={1}
                fontWeight={"bold"}
                padding={1}
              >
                <DescriptionIcon sx={{ marginRight: 0.7 }} />
                {t("volunteeringAdmin.newOpportunity.descriptionTitle")}
              </Typography>
            </Box>
            <TextField
              value={opportunity.description}
              onChange={(e) =>
                setOpportunity((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              multiline
              rows={5}
              fullWidth
              placeholder={t(
                "volunteeringAdmin.newOpportunity.descriptionPlaceholder",
              )}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiInputBase-inputMultiline": {
                  color: "primary.main",
                },
                fontWeight: 100,
                padding: 1,
                color: "red",
              }}
            />
          </Box>

          {/* Schedules */}
          <Box
            border={1.5}
            marginTop={2}
            borderRadius={1}
            borderColor={"primary.main"}
          >
            <Box
              bgcolor={"primary.light"}
              sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
            >
              <Typography color="white" fontWeight={"bold"} padding={1}>
                <EventIcon sx={{ marginRight: 0.7 }} />
                {t("volunteeringAdmin.newOpportunity.schedulesTitle")}
              </Typography>
            </Box>

            {/* Schedules: Titles */}
            <Box
              paddingLeft={1.5}
              paddingY={1.5}
              sx={{
                display: { xs: "none", md: "grid" },
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1.1fr 1fr 1fr 0.5fr 72px",
                },
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography
                fontSize={"0.85rem"}
                color="primary.main"
                paddingLeft={1.5}
                fontWeight={"bold"}
              >
                {t("volunteeringAdmin.newOpportunity.labels.date")}
              </Typography>
              <Typography
                fontSize={"0.85rem"}
                color="primary.main"
                paddingLeft={1.5}
                fontWeight={"bold"}
              >
                {t("volunteeringAdmin.newOpportunity.labels.startTime")}
              </Typography>
              <Typography
                fontSize={"0.85rem"}
                color="primary.main"
                paddingLeft={1.5}
                fontWeight={"bold"}
              >
                {t("volunteeringAdmin.newOpportunity.labels.endTime")}
              </Typography>
              <Typography
                fontSize={"0.85rem"}
                color="primary.main"
                paddingLeft={1.5}
                fontWeight={"bold"}
              >
                {t("volunteeringAdmin.newOpportunity.labels.slots")}
              </Typography>
            </Box>

            {/* Schedules: Inputs */}
            <Schedule setSchedules={setSchedules} schedules={schedules} />
          </Box>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          marginY={2}
          marginLeft={"auto"}
          mr={0.5}
          display={{ xs: "flex", sm: "none" }}
        >
          <Button
            variant="contained"
            size="medium"
            type="submit"
            sx={{ borderRadius: 0.8, width: 150 }}
            startIcon={<SaveIcon />}
            disabled={
              opportunity.category === "" ||
              opportunity.description === "" ||
              (schedules.length === 1 && schedules[0].date === null) ||
              isSaving
            }
          >
            {t("volunteeringAdmin.newOpportunity.save")}
          </Button>
          <Button
            variant="outlined"
            size="medium"
            type="button"
            sx={{ borderRadius: 0.8, width: 150 }}
            startIcon={<CancelIcon />}
            onClick={() => {
              window.location.reload();
            }}
            disabled={
              opportunity.category === "" ||
              opportunity.description === "" ||
              (schedules.length === 1 && schedules[0].date === null)
            }
          >
            {t("volunteeringAdmin.newOpportunity.reset")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
