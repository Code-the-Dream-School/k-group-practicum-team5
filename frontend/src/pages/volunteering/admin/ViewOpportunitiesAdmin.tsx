import { type GridColDef, type GridRowParams } from "@mui/x-data-grid";
import type {
  ApplicantStatus,
  OpportunityApplicant,
  OpportunityApplicantsDetails,
  OpportunityApplicantsResponse,
  OpportunityRow,
  OpportunitiesResponse,
} from "@/types/volunteering/ViewOppAdmin.type";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
import { apiCall } from "../../../api/axios";
import { useCallback, useState } from "react";
import { SectionHeading } from "@/components/GalleryImages";
import { useTranslation } from "react-i18next";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function ViewOpportunitiesAdmin() {
  const { t } = useTranslation();
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityApplicantsDetails | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogLoading, setIsDialogLoading] = useState(false);
  const [dialogError, setDialogError] = useState("");
  const [actionLoadingKey, setActionLoadingKey] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const columns: GridColDef<OpportunityRow>[] = [
    {
      field: "id",
      headerName: t("volunteeringAdmin.columns.id"),
      width: 80,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.6,
      renderCell: (params) => <strong>{params.value}</strong>,
    },
    {
      field: "createdAt",
      headerName: t("volunteeringAdmin.columns.date"),
      flex: 0.5,
      valueFormatter: (value) =>
        value
          ? new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "",
    },
    {
      field: "schedulesCount",
      headerName: t("volunteeringAdmin.columns.schedules"),
      flex: 0.6,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 6 }}>Schedules</Box>,
    },
    {
      field: "slotsAvailableCount",
      headerName: t("volunteeringAdmin.columns.slots"),
      flex: 0.5,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 6 }}>Slots</Box>,
    },
    {
      field: "applicants",
      headerName: "Applicants",
      flex: 0.5,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 3 }}>Applicants</Box>,
    },
    {
      field: "pendingApplicantsCount",
      headerName: "Pending Applicants",
      flex: 0.5,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 5.5 }}>Pending</Box>,
    },
    {
      field: "approvedApplicantsCount",
      headerName: "Approved Applicants",
      flex: 0.5,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 4 }}>Approved</Box>,
    },
  ];

  const fetchRows = useCallback(async (): Promise<OpportunityRow[]> => {
    const res = (await apiCall(
      "get",
      `${import.meta.env.VITE_API_BASE_URL}/volunteering/opportunities`,
    )) as OpportunitiesResponse;

    return res.opportunities.map((o) => ({
      id: o._id,
      createdAt: o.createdAt,
      category: o.category,
      description: o.description,
      schedulesCount: o.schedulesCount,
      slotsAvailableCount: o.slotsAvailableCount,
      applicants: o.applicants,
      pendingApplicantsCount: o.pendingApplicantsCount,
      approvedApplicantsCount: o.approvedApplicantsCount,
    }));
  }, []);

  const getApplicantName = (applicant: OpportunityApplicant) => {
    if (applicant.user) {
      return `${applicant.user.first_name} ${applicant.user.last_name}`;
    }
    return applicant.userId;
  };

  const getStatusChipColor = (status: ApplicantStatus) => {
    if (status === "Approved") return "success";
    if (status === "Rejected") return "error";
    return "warning";
  };

  const openApplicantsDialog = useCallback(async (opportunityId: string) => {
    setIsDialogOpen(true);
    setIsDialogLoading(true);
    setDialogError("");
    try {
      const response = await apiCall<OpportunityApplicantsResponse>(
        "get",
        `${import.meta.env.VITE_API_BASE_URL}/volunteering/opportunities/${opportunityId}/applicants`,
      );
      setSelectedOpportunity(response.opportunity);
    } catch {
      setSelectedOpportunity(null);
      setDialogError("Failed to load applicants.");
    } finally {
      setIsDialogLoading(false);
    }
  }, []);

  const handleRowClick = useCallback(
    (params: GridRowParams<OpportunityRow>) => {
      void openApplicantsDialog(params.row.id);
    },
    [openApplicantsDialog],
  );

  const updateApplicantStatus = useCallback(
    async (scheduleId: string, userId: string, status: ApplicantStatus) => {
      if (!selectedOpportunity) return;

      const loadingKey = `${scheduleId}-${userId}-${status}`;
      setActionLoadingKey(loadingKey);
      setDialogError("");

      try {
        await apiCall("patch", `${import.meta.env.VITE_API_BASE_URL}/volunteering/opportunity/applicant/status`, {
          opportunityId: selectedOpportunity._id,
          scheduleId,
          userId,
          status,
        });

        setSelectedOpportunity((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            schedules: prev.schedules.map((schedule) => {
              if (schedule._id !== scheduleId) return schedule;
              return {
                ...schedule,
                applicants: schedule.applicants.map((applicant) =>
                  applicant.userId === userId ? { ...applicant, status } : applicant,
                ),
              };
            }),
          };
        });
        setRefreshKey((prev) => prev + 1);
      } catch {
        setDialogError("Failed to update applicant status.");
      } finally {
        setActionLoadingKey("");
      }
    },
    [selectedOpportunity],
  );

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogError("");
    setSelectedOpportunity(null);
    setActionLoadingKey("");
  };

  return (
    <Box
      className="min-h-screen flex flex-col px-4"
      bgcolor={"background.default"}
    >
      {/* Header */}
      <Box sx={{ textAlign: { xs: "left", sm: "center" }, mt: 1 }}>
        <SectionHeading title='Volunteering Opportunities' fontSize={{ xs: "1rem", sm: "1.5rem", md: "1.5rem" }} />
      </Box>
      <Box pb={1}>
        <IconButton
          size="small"
          sx={{ borderRadius: 1, px: 2 }}
          onClick={() => (window.location.href = "new")}
        >
          <AddCircleIcon
            sx={{
              fontSize: "2.5rem",
              color: "primary.main",
              cursor: "pointer",
              mr: 0.5,
            }}
            aria-label="Add New Opportunity"
          />
          <Typography variant="h6" color="primary.main" fontWeight={600}>
            Add New Opportunity
          </Typography>
        </IconButton>
      </Box>
      <CommonTable
        fetchRows={fetchRows}
        columns={columns}
        onRowClick={handleRowClick}
        refreshKey={refreshKey}
      />
      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="md">
        <DialogTitle>
          {selectedOpportunity
            ? `Applicants - ${selectedOpportunity.category}`
            : "Applicants"}
        </DialogTitle>
        <DialogContent dividers>
          {isDialogLoading && <Typography>Loading applicants...</Typography>}
          {!isDialogLoading && dialogError && (
            <Typography color="error.main">{dialogError}</Typography>
          )}
          {!isDialogLoading && selectedOpportunity && (
            <Stack spacing={2}>
              {selectedOpportunity.schedules.map((schedule) => (
                <Box key={schedule._id}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {new Date(schedule.timeFrom).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
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
                  {schedule.applicants.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No applicants for this schedule.
                    </Typography>
                  ) : (
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {schedule.applicants.map((applicant) => (
                          <TableRow key={`${schedule._id}-${applicant.userId}`}>
                            <TableCell>{getApplicantName(applicant)}</TableCell>
                            <TableCell>{applicant.user?.email ?? "-"}</TableCell>
                            <TableCell>
                              <Chip
                                size="small"
                                color={getStatusChipColor(applicant.status)}
                                label={applicant.status}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Button
                                  variant="outlined"
                                  color="success"
                                  size="small"
                                  disabled={
                                    applicant.status === "Approved" ||
                                    actionLoadingKey === `${schedule._id}-${applicant.userId}-Approved`
                                  }
                                  onClick={() =>
                                    void updateApplicantStatus(schedule._id, applicant.userId, "Approved")
                                  }
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  disabled={
                                    applicant.status === "Rejected" ||
                                    actionLoadingKey === `${schedule._id}-${applicant.userId}-Rejected`
                                  }
                                  onClick={() =>
                                    void updateApplicantStatus(schedule._id, applicant.userId, "Rejected")
                                  }
                                >
                                  Reject
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
