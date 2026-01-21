export const commonTableSx = {
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
    outline: "none",
  },
  "& .MuiButtonBase-root.Mui-focusVisible": {
    outline: "none",
    boxShadow: "none",
  },
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
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: "6px double var(--zooLight)",
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
  },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-select": {
    fontSize: "0.8rem",
    fontWeight: "100",
  },
  border: "1px solid var(--zooGreen)",
  borderRadius: "2rem",
  padding: "2rem",
};
