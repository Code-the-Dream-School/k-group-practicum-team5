import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select, Typography, Box, TextField, InputAdornment, Stack, Button } from "@mui/material";
import { apiCall } from "../../../api/axios";
import Schedule from "@/pages/volunteering/admin/Schedule";
import { SectionHeading } from "@/components/GalleryImages";
import type { AvailabilityFormValue } from "@/types/volunteering/AvailabilityFormValue.type";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Slide from "@mui/material/Slide";

// Icons
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export default function NewVolunteeringOpportunity() {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [opportunity, setOpportunity] = useState({ category: "", description: "" });
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

    try {
      const response = await apiCall<{ data: { id: string } }>(
        "post",
        `${import.meta.env.VITE_API_BASE_URL}/volunteering/new`,
        opportunity,
      );

      const volunteeringId = response.data.id;
      // Create schedules
      // for (const schedule of schedules) {
      //   await apiCall("post", `${import.meta.env.VITE_API_BASE_URL}/volunteeringSchedule/${volunteeringId}/schedules`, {
      //     volunteeringId,
      //     date: schedule.date,
      //     timeFrom: schedule.timeFrom,
      //     timeTo: schedule.timeTo,
      //     slotsAvailable: schedule.slotsAvailable,
      //   });
      // }
      setSuccessMessage("Volunteering opportunity created successfully!");
      setErrorMessage(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error creating opportunity:", error);
      setErrorMessage("Failed to create volunteering opportunity.");
      setSuccessMessage(null);
    }
  };

  return (
    <Box className='min-h-screen flex flex-col px-4' bgcolor={"background.default"}>
      {successMessage && (
        <Slide direction='down' in={!!successMessage} mountOnEnter unmountOnExit>
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
              severity='success'
              variant='filled'
              sx={{ paddingRight: 5, borderRadius: 0.5, bgcolor: "primary.main", boxShadow: 10 }}
            >
              <AlertTitle>
                <strong>Success</strong>
              </AlertTitle>
              {successMessage}
            </Alert>
          </Box>
        </Slide>
      )}
      {errorMessage && (
        <Slide direction='down' in={!!errorMessage} mountOnEnter unmountOnExit>
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
              severity='error'
              variant='filled'
              sx={{ paddingRight: 3, borderRadius: 0.5, bgcolor: "error.dark", boxShadow: 10 }}
            >
              <AlertTitle>
                <strong>Error</strong>
              </AlertTitle>
              {errorMessage}
            </Alert>
          </Box>
        </Slide>
      )}
      {/* Header */}
      <Box sx={{ textAlign: { xs: "left", sm: "center" }, my: 1 }}>
        <SectionHeading title='New Volunteering Opportunity' fontSize={{ xs: "1rem", sm: "1.5rem", md: "1.5rem" }} />
      </Box>

      <form onSubmit={handleSubmit}>
        <Box border={0.1} borderColor={"primary.light"} borderRadius={1} padding={4} boxShadow={1}>
          {/* Select Category */}
          <Box display={"flex"} border={0} alignItems={"end"}>
            <FormControl size='small'>
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setOpportunity({ ...opportunity, category: e.target.value });
                }}
                startAdornment={
                  <InputAdornment position='start'>
                    <CategoryIcon fontSize='small' />
                    <Typography variant='body1' color='primary.main' ml={1} fontWeight={"bold"}>
                      Category:
                    </Typography>
                    {category === "" && (
                      <Typography variant='body2' color='primary.main' ml={1} sx={{ opacity: 0.7 }}>
                        Select Category
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
                    sx: {
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
                    },
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
            <Stack direction='row' spacing={2} marginLeft={"auto"} position={"relative"} top={-7} mr={0.5}>
              <Button
                variant='outlined'
                size='medium'
                type='button'
                sx={{ borderRadius: 0.8, width: 150 }}
                startIcon={<CancelIcon />}
                onClick={() => {
                  window.location.reload();
                }}
                disabled={
                  opportunity.category === "" ||
                  opportunity.description === "" ||
                  (schedules.length === 1 &&
                  schedules[0].date === null)
                }
              >
                Reset
              </Button>
              <Button
                variant='contained'
                size='medium'
                type='submit'
                sx={{ borderRadius: 0.8, width: 150 }}
                startIcon={<SaveIcon />}
                disabled={
                  opportunity.category === "" ||
                  opportunity.description === "" ||
                  (schedules.length === 1 &&
                  schedules[0].date === null)
                }
              >
                Save
              </Button>
            </Stack>
          </Box>

          {/* Description */}
          <Box border={1.5} marginTop={1} borderRadius={1} borderColor={"primary.main"}>
            <Box bgcolor={"primary.light"} sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
              <Typography color='white' marginLeft={1} fontWeight={"bold"} padding={1}>
                <DescriptionIcon sx={{ marginRight: 0.7 }} />
                Description
              </Typography>
            </Box>
            <TextField
              value={opportunity.description}
              onChange={(e) => setOpportunity((prev) => ({ ...prev, description: e.target.value }))}
              multiline
              rows={5}
              fullWidth
              placeholder='Describe the volunteering opportunity...'
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
          <Box border={1.5} marginTop={2} borderRadius={1} borderColor={"primary.main"}>
            <Box bgcolor={"primary.light"} sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
              <Typography color='white' fontWeight={"bold"} padding={1}>
                <EventIcon sx={{ marginRight: 0.7 }} />
                Schedules
              </Typography>
            </Box>

            {/* Schedules: Titles */}
            <Box
              paddingLeft={1.5}
              paddingY={1.5}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr 1fr 0.5fr 72px" },
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography fontSize={"0.85rem"} color='primary.main' paddingLeft={1.5} fontWeight={"bold"}>
                Date
              </Typography>
              <Typography fontSize={"0.85rem"} color='primary.main' paddingLeft={1.5} fontWeight={"bold"}>
                Start Time
              </Typography>
              <Typography fontSize={"0.85rem"} color='primary.main' paddingLeft={1.5} fontWeight={"bold"}>
                End Time
              </Typography>
              <Typography fontSize={"0.85rem"} color='primary.main' paddingLeft={1.5} fontWeight={"bold"}>
                Slots
              </Typography>
            </Box>

            {/* Schedules: Inputs */}
            <Schedule setSchedules={setSchedules} schedules={schedules} />
          </Box>
        </Box>
      </form>
    </Box>
  );
}
