export const commonTableSx = {
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
    {
      outline: "none",
    },
  "& .MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
  },
  "& .MuiDataGrid-row": {
    cursor: "pointer",
    paddingX: "1.3rem",
  },
  "& .MuiDataGrid-columnHeader": {
    color: "white",
    fontSize: "1rem",
    backgroundColor: "primary.light",
    fontWeight: "bold",
  },

  "& .MuiDataGrid-cell": {
    fontSize: "0.98rem",
    color: "primary.main",
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    marginX: "1.3rem",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "background.default",
  },
  "& .MuiDataGrid-row--borderBottom": {
    borderBottom: "1.3px solid",
    borderColor: "primary.light",
  },
};
