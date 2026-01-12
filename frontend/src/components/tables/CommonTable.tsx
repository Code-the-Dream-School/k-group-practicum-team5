import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

interface CommonTableProps {
  fetchRows: () => Promise<object[]>;
  columns: GridColDef[];
}

const CommonTable = ({ fetchRows, columns }: CommonTableProps) => {

  const [rows, setRows] = useState<object[]>([]);

  useEffect(() => {
    fetchRows().then((data) => setRows(data));
  },[fetchRows])

  const paginationModel = { page: 0, pageSize: 10 };
  const columnVisibilityModel = { id: false, timeFrom: false, timeTo: false };

  return (
    <Paper sx={{ width: "100%", marginTop: "2rem", borderRadius: "2rem" }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        sx={{
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "500",
          },
          "& .MuiDataGrid-columnHeader": {
            color: "var(--zooGreen)",
            fontSize: "1rem",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "6px double var(--zooLight)",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "0.9rem",
            color: "var(--zooDark)",
            fontWeight: "200",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "var(--zooLight)",
          },
          "& .MuiTablePagination-root": {
            marginTop: "1.5rem",
            fontSize: "0.9rem",
            fontWeight: "100",
          },
          "& .MuiTablePagination-selectLabel": {
            fontSize: "1rem",
            fontWeight: "100",
          },
          "& .MuiTablePagination-displayedRows": {
            fontSize: "1rem",
            fontWeight: "100",
          },
          "& .MuiTablePagination-select": {
            fontSize: "1rem",
            fontWeight: "100",
          },
          border: "1px solid var(--zooGreen)",
          borderRadius: "2rem",
          padding: "2rem",
        }}
        initialState={{ pagination: { paginationModel }, columns: { columnVisibilityModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Paper>
  );
};

export default CommonTable;
