import { useEffect, useState } from "react";
import { useOpportunity } from "@/hooks/volunteering/admin/useOpportunity";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Chip, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { GetOpportunitiesResponse } from "@/types/volunteering/ViewOppUser.type";
import { SectionHeading } from "@/components/GalleryImages";

// Mui Icons
import EventIcon from "@mui/icons-material/Event";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Button from "@mui/material/Button";

const ViewOpportunities = () => {
  const limit = 10;

  const { isLoading, isError, error, getOpportunities } = useOpportunity();
  const [opportunities, setOpportunities] = useState<GetOpportunitiesResponse["opportunities"]>([]);
  const errorMessage =
    typeof error === "string"
      ? error
      : error && typeof error === "object" && "message" in error
        ? String((error as { message?: string }).message ?? "Failed to load opportunities.")
        : "Failed to load opportunities.";

  useEffect(() => {
    const fetchOpportunities = async () => {
      const res = await getOpportunities({ limit });
      console.log(res);

      setOpportunities(res?.opportunities);
    };
    fetchOpportunities();
  }, [limit, getOpportunities]);

  return (
    <Box className='min-h-screen flex flex-col px-4 py-1' bgcolor={"background.default"} sx={{ borderRadius: 0 }}>
      <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
        <SectionHeading title='Available Opportunities' fontSize={{ xs: "1rem", sm: "1.5rem", md: "1.5rem" }} />
      </Box>

      {isLoading && <Typography variant='body1'>Loading opportunities...</Typography>}

      {isError && (
        <Typography variant='body1' color='error'>
          {errorMessage}
        </Typography>
      )}

      {!isLoading && !isError && opportunities.length === 0 && (
        <Typography variant='body1'>No opportunities found.</Typography>
      )}

      <Box display='flex' flexDirection='column' borderRadius={1} border={1.5} borderColor='primary.light'>
        {opportunities.map((opportunity) => (
          <Accordion key={opportunity._id} sx={{ boxShadow: 20, paddingBottom: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display='flex' flexDirection='column' width='100%' gap={0.5}>
                <Typography variant='subtitle1' fontWeight={700} color='primary.main'>
                  {opportunity.category}
                </Typography>
                <Box display='flex' alignItems='center' gap={2}>
                  <Typography variant='body2' color='text.secondary'>
                    Posted {new Date(opportunity.createdAt).toLocaleDateString()}
                  </Typography>
                  <Chip
                    size='small'
                    label={`${opportunity.slotsAvailableCount - opportunity.applicantsCount} Available slots`}
                    sx={{ backgroundColor: "primary.light", color: "primary.contrastText", fontWeight: 500 }}
                  />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body1' mb={2}>
                {opportunity.description || "No description provided."}
              </Typography>

              {opportunity.schedules.length === 0 ? (
                <Typography variant='body2'>No schedules available.</Typography>
              ) : (
                <Box
                  display='flex'
                  flexDirection='column'
                  gap={1}
                  sx={{ borderStyle: "solid", borderTop: 1, pt: 2, borderColor: "primary.light" }}
                >
                  {opportunity.schedules.map((schedule) => (
                    <Box key={schedule._id}>
                      <Box
                        display='flex'
                        gap={1.5}
                        alignItems='center'
                        sx={{ ":hover": { bgcolor: "background.default" } }}
                      >
                        <Typography variant='body2' fontWeight={600} minWidth={205}>
                          <EventIcon
                            fontSize='small'
                            sx={{ verticalAlign: "middle", mr: 0.5, color: "primary.main" }}
                          />
                          {new Date(schedule.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          })}
                        </Typography>
                        <Typography variant='body2'>
                          <AccessTimeFilledIcon
                            fontSize='small'
                            sx={{ verticalAlign: "middle", mx: 0.5, color: "primary.main" }}
                          />{" "}
                          {new Date(schedule.timeFrom).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(schedule.timeTo).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Chip size='small' label={`${schedule.slotsAvailable - schedule.applicantsCount} slots`} />
                        <Button
                          variant='contained'
                          sx={{ paddingY: 0, boxShadow: "1px 3px 10px rgba(0,0,0,0.2)", borderRadius: 0.5 }}
                          color='primary'
                          size='small'
                        >
                          👋 Apply
                        </Button>
                      </Box>
                      {schedule.applicants.length > 0 && (
                        <Typography variant='caption' color='text.secondary'>
                          Applicants loaded: {schedule.applicants.length}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Paper elevation={3} sx={{ p: 3, mt: 4, bgcolor: "background.paper", borderRadius: 1, mb: 5 }}>
        <Typography
          variant='h5'
          fontWeight={900}
          color='text.secondary'
          align='left'
          mt={5}
          mb={1}
          sx={{ color: "primary.main" }}
        >
          Didn't find an opportunity that fits you?
        </Typography>
        <Typography variant='h5' color='text.secondary' align='left' mb={3}>
          Kindly inform us of your interest in future volunteering opportunities so that we can expand our offerings
          based on the number of interested individuals.
        </Typography>
        <Button
          variant='contained'
          size='large'
          sx={{
            alignSelf: "center",
            mb: 3,
            fontSize: "1.5rem",
            boxShadow: "2px 8px 30px rgba(0,0,0,0.3)",
            paddingY: 2,
            paddingX: 5,
          }}
        >
          💚 I am interested
        </Button>
      </Paper>
    </Box>
  );
};

export default ViewOpportunities;
