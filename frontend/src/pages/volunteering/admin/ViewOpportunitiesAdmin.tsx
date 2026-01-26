import { type GridColDef } from "@mui/x-data-grid";
import type { OpportunityRow, OpportunitiesResponse } from "@/types/volunteering/ViewOppAdmin.type";
import { Box } from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
import { apiCall } from "../../../api/axios";
import { useCallback } from "react";
import { SectionHeading } from "@/components/GalleryImages";

export default function ViewOpportunitiesAdmin() {
  const columns: GridColDef<OpportunityRow>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 0.4,
      valueFormatter: (value) => (value ? new Date(value).toLocaleDateString() : ""),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.4,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "schedulesCount",
      headerName: "Schedules",
      flex: 0.5,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 6.5 }}>Schedules</Box>,
    },
    {
      field: "slotsAvailableCount",
      headerName: "Slots",
      flex: 0.5,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 9.5 }}>Slots</Box>,
    },
  ];

  const fetchRows = useCallback(async (): Promise<OpportunityRow[]> => {
    const res = (await apiCall(
      "get",
      `${import.meta.env.VITE_API_BASE_URL}/volunteering/opportunities`,
    )) as OpportunitiesResponse;

    return res.opportunities.map((o) => ({
      id: o._id,
      createdAt: o.createdAt,
      category: o.category,
      description: o.description,
      schedulesCount: o.schedulesCount,
      slotsAvailableCount: o.slotsAvailableCount,
    }));
  }, []);

  return (
    <Box className='min-h-screen flex flex-col px-4' bgcolor={"background.default"}>
      {/* Header */}
      <Box sx={{ textAlign: { xs: "left", sm: "center" }, my: 1 }}>
        <SectionHeading title='Volunteering Opportunities' />
      </Box>
      <CommonTable fetchRows={fetchRows} columns={columns} />
    </Box>
  );
}
