import type { GridColDef } from "@mui/x-data-grid";

export interface CommonTableProps {
  fetchRows: () => Promise<object[]>;
  columns: GridColDef[];
}