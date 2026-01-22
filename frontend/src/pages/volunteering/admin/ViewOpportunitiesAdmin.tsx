import { type GridColDef } from "@mui/x-data-grid";
import type { OpportunityRow } from "@/types/volunteering/ViewOppAdmin.type";
import { Box, Typography } from "@mui/material";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import CommonTable from "../../../components/tables/CommonTable";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useGenericModal } from "@/hooks/useGenericModal";
import GenericModal from "@/components/modals/GenericModal";
import { apiCall } from "../../../api/axios";
import { useCallback } from "react";

export default function ViewOpportunitiesAdmin() {
  const modal = useGenericModal();

  const columns: GridColDef<OpportunityRow>[] = [
    {
      field: "actions",
      headerName: "",
      align: "center",
      flex: 0.2,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          aria-label='edit'
          sx={{
            color: "var(--zooGreen)",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            "&:hover": {
              color: "black",
            },
          }}
          onClick={() => {
            console.log(params);
            modal.show();
          }}
        >
          <OpenInNewIcon fontSize='small' />
        </IconButton>
      ),
    },
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "date",
      headerName: "Posted Date",
      flex: 0.5,
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
    { field: "timeFrom", headerName: "From Time", width: 150 },
    { field: "timeTo", headerName: "To Time", width: 150 },
    {
      field: "time",
      headerName: "Time Slot",
      width: 150,
      flex: 0.5,
      valueFormatter: (_, row) => `${row.timeFrom} - ${row.timeTo}`,
    },
    { field: "category", headerName: "Category", flex: 0.5 },
    { field: "description", headerName: "Description", flex: 0.8 },
    {
      field: "totalApplicants",
      headerName: "Applicants",
      flex: 0.5,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 2 }}>Pending Applicants</Box>,
    },
    {
      field: "totalAssignees",
      headerName: "Assignees",
      flex: 0.5,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 5 }}>Assignees</Box>,
    },
  ];

  const fetchRows = useCallback(async (): Promise<OpportunityRow[]> => {
    return apiCall("get", `${import.meta.env.VITE_API_BASE_URL}/volunteering/opportunities`) as Promise<
      OpportunityRow[]
    >;
  }, []);

  return (
    <Box className='min-h-screen bg-zooLight flex flex-col px-4 py-12 border'>
      <Box display='flex' alignItems='center' gap={1} marginLeft={"20px"}>
        <VolunteerActivismRoundedIcon
          sx={{
            color: "var(--zooGreen)",
            fontSize: "3rem",
          }}
        />
        <Typography variant='h5' className='text-zooGreen pt-auto text-2xl'>
          Volunteering Opportunities
        </Typography>
        <GenericModal width={900} open={modal.open} onClose={modal.hide}>
          <Typography variant='h6'>Modal Title</Typography>
          <Typography marginTop={"1rem"} marginBottom={"6rem"}>
            This is test modal component for data
          </Typography>
          <Button
            variant='outlined'
            onClick={modal.hide}
            sx={{ color: "var(--zooGreen)", borderColor: "var(--zooGreen)" }}
          >
            Close
          </Button>
        </GenericModal>
      </Box>
      <CommonTable fetchRows={fetchRows} columns={columns} />
    </Box>
  );
}
