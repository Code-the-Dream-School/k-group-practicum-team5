import type { GridColDef, GridRowParams } from "@mui/x-data-grid";

export interface CommonTableProps {
  fetchRows: () => Promise<object[]>;
  columns: GridColDef[];
  onRowClick?: (params: GridRowParams) => void;
  refreshKey?: number;
}
