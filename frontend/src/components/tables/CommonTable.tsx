import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import type { CommonTableProps } from "@/types/volunteering/CommonTableProps.type";
import { commonTableSx } from "./CommonTable.styles.ts";

const CommonTable = ({ fetchRows, columns }: CommonTableProps) => {
  const [rows, setRows] = useState<object[]>([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetchRows()
      .then((data) => {
        setRows(data);
        setFetchError(false);
      })
      .catch(() => {
        setFetchError(true);
        setRows([]);
      });
  }, [fetchRows]);

  // const paginationModel = { page: 0, pageSize: 10 };
  const columnVisibilityModel = { id: false, timeFrom: false, timeTo: false };

  return (
    <Paper>
      <DataGrid
        rows={rows}
        hideFooterPagination
        getRowId={(row) => row.id ?? row._id}
        columns={columns}
        // initialState={{ pagination: { paginationModel }, columns: { columnVisibilityModel } }}
        initialState={{  columns: { columnVisibilityModel } }}
        // pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        slots={{
          noRowsOverlay: () => (
            <div className='h-full text-red-400 flex justify-center items-center'>
              {fetchError ? "Error loading data" : "No rows"}
            </div>
          ),
        }}
        sx={commonTableSx}
      />
    </Paper>
  );
};

export default CommonTable;
