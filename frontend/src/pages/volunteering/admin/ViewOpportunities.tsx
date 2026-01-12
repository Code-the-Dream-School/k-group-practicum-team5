import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import { type GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import CommonTable from "../../../components/tables/commonTable";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function ViewOpportunities() {
 
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 0 },
    {
      field: "date",
      headerName: "Posted Date",
      flex: 1,
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
    { field: "timeFrom", headerName: "From Time", width: 150 },
    { field: "timeTo", headerName: "To Time", width: 150 },
    {
      field: "time",
      headerName: "Time Slot",
      width: 150,
      valueFormatter: (_, row) => `${row.timeFrom} - ${row.timeTo}`,
    },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "description", headerName: "Description", flex: 1.5 },
    { field: "totalApplicants", headerName: "Applications", flex: 1 },
    { field: "totalAssignees", headerName: "Assignees", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: () => (
        <IconButton
          aria-label='edit'
          sx={{
            color: "var(--zooGreen)",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
        >
          <EditIcon fontSize='small' />
        </IconButton>
      ),
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
    <div className='min-h-screen bg-zooLight flex flex-col px-4 py-12'>
      <Box display='flex' alignItems='center' gap={1} marginLeft={"20px"}>
        <VolunteerActivismRoundedIcon
          sx={{
            color: "var(--zooGreen)",
            fontSize: "3rem",
          }}
        />
        <h1 className='font-bold text-zooGreen pt-auto text-2xl'>Volunteering Opportunities</h1>
      </Box>
      <CommonTable fetchRows={fetchRows} columns={columns} />
    </div>
  );
}
