import { useEffect, useState } from "react";
import { useOpportunity } from "@/hooks/volunteering/admin/useOpportunity";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Chip, Paper } from "@mui/material";
import type { GetOpportunitiesResponse } from "@/types/volunteering/ViewOppUser.type";
import { SectionHeading } from "@/components/GalleryImages";
import { apiCall } from "@/api/axios";

// Mui Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Button from "@mui/material/Button";

const ViewOpportunities = () => {
  const limit = 10;

  const { isLoading, isError, error, getOpportunities, getAppliedOpportunities } = useOpportunity();
  const [opportunities, setOpportunities] = useState<GetOpportunitiesResponse["opportunities"]>([]);
  const [appliedOpportunities, setAppliedOpportunities] = useState<GetOpportunitiesResponse["opportunities"]>([]);
  const errorMessage =
    typeof error === "string"
      ? error
      : error && typeof error === "object" && "message" in error
        ? String((error as { message?: string }).message ?? "Failed to load opportunities.")
        : "Failed to load opportunities.";

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const userData = storedUser ? JSON.parse(storedUser) : undefined;
        const [availableRes, appliedRes] = await Promise.all([
          getOpportunities({ userId: userData?.id }),
          getAppliedOpportunities({ userId: userData?.id }),
        ]);

        setOpportunities(availableRes?.opportunities ?? []);
        setAppliedOpportunities(appliedRes?.opportunities ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOpportunities();
  }, [limit, getAppliedOpportunities, getOpportunities]);

  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : undefined;
  const currentUserId = String(userData?.id ?? userData?._id ?? "");

  const addApplicantToSchedule = async (opportunityId: string, scheduleId: string) => {
    try {
      if (currentUserId) {
        await apiCall("post", "/volunteering/opportunity/addApplicant", {
          opportunityId,
          scheduleId,
          userId: currentUserId,
        });

        const selectedOpportunity = opportunities.find((o) => o._id === opportunityId);
        const selectedSchedule = selectedOpportunity?.schedules.find((s) => s._id === scheduleId);
        if (!selectedOpportunity || !selectedSchedule) return;

        const updatedSchedule = {
          ...selectedSchedule,
          applicants: [
            ...selectedSchedule.applicants,
            { userId: currentUserId, scheduleId, status: "Pending" },
          ],
          applicationStatus: "Pending",
        };

        setAppliedOpportunities((prev) => {
          const opportunityIndex = prev.findIndex((o) => o._id === selectedOpportunity._id);
          if (opportunityIndex === -1) {
            return [
              ...prev,
              {
                ...selectedOpportunity,
                schedules: [updatedSchedule],
              },
            ];
          }

          return prev.map((opportunity, idx) =>
            idx !== opportunityIndex
              ? opportunity
              : {
                  ...opportunity,
                  schedules: opportunity.schedules.some((s) => s._id === updatedSchedule._id)
                    ? opportunity.schedules
                    : [...opportunity.schedules, updatedSchedule],
                },
          );
        });

        setOpportunities((prev) =>
          prev.map((opportunity) =>
            opportunity._id !== opportunityId
              ? opportunity
              : {
                  ...opportunity,
                  schedules: opportunity.schedules.map((schedule) => {
                    if (schedule._id !== scheduleId) return schedule;

                    const alreadyApplied = schedule.applicants.some(
                      (applicant) => String(applicant.userId) === String(currentUserId),
                    );
                    if (alreadyApplied) return schedule;

                    return {
                      ...schedule,
                      applicants: [...schedule.applicants, { userId: currentUserId, scheduleId, status: "Pending" }],
                    };
                  }),
                },
          ),
        );
      }
    } catch (err) {
      console.error("Error adding applicant:", err);
    }
  };

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
        <Typography variant='body1'>No opportunities found, please try again later.</Typography>
      )}
      <Typography variant='h6' fontWeight={700} mb={1} ml={1.5} color='primary.main'>
        Available volunteer opportunities
      </Typography>
      <Box display='flex' flexDirection='column' borderRadius={1} border={1.5} borderColor='primary.light'>
        {opportunities.map((opportunity) => (
          <Accordion key={opportunity._id} sx={{ boxShadow: 20, paddingY: 0.5 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display='flex' flexDirection='row' alignItems={"center"} gap={1.5}>
                <Typography variant='subtitle1' fontWeight={700} color='primary.main'>
                  {opportunity.category}
                </Typography>
                <Chip
                  size='small'
                  label={`${opportunity.schedules.length} ${opportunity.schedules.length === 1 ? "Schedule" : "Schedules"} Available`}
                  sx={{ backgroundColor: "primary.light", color: "primary.contrastText", fontWeight: 500 }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body1' mb={3}>
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
                  {opportunity.schedules.map((schedule) => {
                    const hasApplied =
                      !!currentUserId &&
                      schedule.applicants.some((applicant) => String(applicant.userId) === String(currentUserId));

                    return (
                      <Box key={`${schedule.timeFrom}-${schedule.timeTo}`}>
                        <Box
                          display='flex'
                          gap={1.5}
                          alignItems='center'
                          sx={{ ":hover": { bgcolor: "background.default" } }}
                        >
                          <Typography variant='body2' fontWeight={600}>
                            <EventIcon
                              fontSize='small'
                              sx={{ verticalAlign: "middle", mr: 0.5, color: "primary.main" }}
                            />
                            {new Date(schedule.timeFrom).toLocaleDateString("en-US", {
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
                            />
                            {new Date(schedule.timeFrom).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            -{" "}
                            {new Date(schedule.timeTo).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                          <Chip
                            size='small'
                            label={`${schedule.slotsAvailable - schedule.applicants.filter((a) => a.status === "Approved").length} slots`}
                          />
                          {!hasApplied ? (
                            <Button
                              onClick={() => {
                                if (hasApplied) return;
                                addApplicantToSchedule(opportunity._id, schedule._id);
                              }}
                              variant='contained'
                              sx={{ paddingY: 0, boxShadow: "1px 3px 10px rgba(0,0,0,0.2)", borderRadius: 0.5 }}
                              color='primary'
                              size='small'
                            >
                              {hasApplied ? "Applied" : "💚 Apply"}
                            </Button>
                          ) : (
                            <Typography variant='body2' color='text.primary' ml={1.8}>
                              👍🏻 Applied
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {!isLoading && !isError && appliedOpportunities.length > 0 && (
        <Box mt={5}>
          <Typography variant='h6' fontWeight={700} mb={1} ml={1.5} color='primary.main'>
            Your Applied Schedules
          </Typography>
          <Paper elevation={3} sx={{ p: 2, boxShadow: "1px 3px 10px rgba(0,0,0,0.2)", border: 1 }}>
            <Box
              display='flex'
              flexDirection='column'
              gap={1}
              // border={1}
              borderColor='primary.light'
              borderRadius={1}
              p={2}
            >
              {appliedOpportunities.map((opportunity) =>
                opportunity.schedules.map((schedule) => (
                  <Box
                    key={`applied-${opportunity._id}-${schedule._id}`}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    gap={1}
                    sx={{ flexWrap: "wrap", p: 1, borderBottom: "1px solid", borderColor: "divider" }}
                  >
                    <Typography variant='body2' fontWeight={600}>
                      <Typography variant='body2' fontWeight={600}>
                        {opportunity.category}:{" "}
                      </Typography>
                      <Typography variant='body2'>{opportunity.description}</Typography>
                      {new Date(schedule.timeFrom).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })}{" "}
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
                    <Chip
                      size='small'
                      label={schedule.applicationStatus ?? "Pending"}
                      color={
                        schedule.applicationStatus === "Approved"
                          ? "success"
                          : schedule.applicationStatus === "Rejected"
                            ? "error"
                            : "warning"
                      }
                    />
                  </Box>
                )),
              )}
            </Box>
          </Paper>
        </Box>
      )}
      <Paper elevation={3} sx={{ p: 3, mt: 4, bgcolor: "background.paper", borderRadius: 1, mb: 5 }}>
        <Typography
          variant='h5'
          fontWeight={900}
          color='text.secondary'
          align='left'
          mt={5}
          mb={3}
          sx={{ color: "primary.main" }}
        >
          Didn't find an opportunity that fits you, or are you interested in future opportunities?
        </Typography>
        <Typography variant='h5' color='text.secondary' align='left' mb={6}>
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
