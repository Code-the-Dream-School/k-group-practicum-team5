import { type GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import CommonTable from "../../../components/tables/CommonTable";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import IconButton from "@mui/material/IconButton";

export default function ViewOpportunities() {
  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "",
      align: "center",
      flex: 0.2,
      disableColumnMenu: true,
      sortable: false,
      renderCell: () => (
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
        >
          <OpenInNewIcon fontSize='small' />
        </IconButton>
      ),
    },
    { field: "id", headerName: "ID", width: 0 },
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
      renderHeader: () => <div style={{ marginLeft: 10 }}>Pending Applicants</div>,
    },
    {
      field: "totalAssignees",
      headerName: "Assignees",
      flex: 0.3,
      align: "center",
      renderHeader: () => <div style={{ marginLeft: 10 }}>Assignees</div>,
    },
  ];

  const fetchRows = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/volunteering/opportunities`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (data) {
      return console.error(data);
    }
  };

  return (
    <Box className='min-h-screen bg-zooLight flex flex-col px-4 py-12 border'>
      <Box display='flex' alignItems='center' gap={1} marginLeft={"20px"}>
        <VolunteerActivismRoundedIcon
          sx={{
            color: "var(--zooGreen)",
            fontSize: "3rem",
          }}
        />
        <h1 className='text-zooGreen pt-auto text-2xl'>Volunteering Opportunities</h1>
      </Box>
      <CommonTable fetchRows={fetchRows} columns={columns} />
    </Box>
  );
}
