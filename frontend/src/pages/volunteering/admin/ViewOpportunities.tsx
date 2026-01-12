import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";

export default function ViewOpportunities() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/volunteering/opportunities`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(data);

        setRows(data);
      })
      .catch(console.error);
  }, []);

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

  const paginationModel = { page: 0, pageSize: 10 };
  const columnVisibilityModel = { id: false, timeFrom: false, timeTo: false };

  return (
    <div className='min-h-screen bg-zooLight flex flex-col px-4 py-12'>
      <Box display='flex' alignItems='center' gap={1}>
        <VolunteerActivismRoundedIcon
          sx={{
            color: "var(--zooGreen)",
            fontSize: "4rem",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
        />
        <h1 className='font-bold text-zooGreen pt-auto text-4xl'>Volunteering Opportunities</h1>
      </Box>
      <Paper sx={{ width: "100%", marginTop: "2.5rem", borderRadius: "2rem" }}>
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "900",
            },
            "& .MuiDataGrid-columnHeader": {
              color: "var(--zooGreen)",
              fontSize: "1.2rem",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "1.1rem",
              color: "var(--zooDark)",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "var(--zooLight)",
            },
            "& .MuiTablePagination-root": {
              marginTop: "1.5rem",
              fontSize: "1.1rem",
            },
            "& .MuiTablePagination-selectLabel": {
              fontSize: "1.1rem",
            },
            "& .MuiTablePagination-displayedRows": {
              fontSize: "1.1rem",
            },
            "& .MuiTablePagination-select": {
              fontSize: "1.1rem",
            },
            border: "0px solid var(--zooGreen)",
            borderRadius: "2rem",
            padding: "2rem",
          }}
          initialState={{ pagination: { paginationModel }, columns: { columnVisibilityModel } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Paper>
    </div>
  );
}
