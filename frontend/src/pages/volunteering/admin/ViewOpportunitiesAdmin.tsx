import { type GridColDef } from "@mui/x-data-grid";
import type { OpportunityRow, OpportunitiesResponse } from "@/types/volunteering/ViewOppAdmin.type";
import { Box, Typography } from "@mui/material";
import CommonTable from "@/components/tables/CommonTable";
import { apiCall } from "../../../api/axios";
import { useCallback } from "react";
import { SectionHeading } from "@/components/GalleryImages";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {IconButton} from "@mui/material";

export default function ViewOpportunitiesAdmin() {
  const columns: GridColDef<OpportunityRow>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.4,
      renderCell: (params) => <strong>{params.value}</strong>,
    },
    {
      field: "createdAt",
      headerName: "Posted Date",
      flex: 0.4,
      valueFormatter: (value) => (value ? new Date(value).toLocaleDateString() : ""),
    },
    {
      field: "schedulesCount",
      headerName: "Schedules",
      flex: 0.4,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 10 }}>Schedules</Box>,
    },
    {
      field: "slotsAvailableCount",
      headerName: "Slots",
      flex: 0.5,
      align: "center",
      renderHeader: () => <Box sx={{ marginLeft: 17.8 }}>Slots</Box>,
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
      <Box sx={{ textAlign: { xs: "left", sm: "center" }, mt: 1 }}>
        <SectionHeading title='Volunteering Opportunities' fontSize={{ xs: "1rem", sm: "1.5rem", md: "1.5rem" }} />
      </Box>
      <Box pb={1}>
      <IconButton size="small" sx={{borderRadius: 1, px:2}} onClick={()=> window.location.href="new"}>
        <AddCircleIcon sx={{ fontSize: "2.5rem", color: "primary.main", cursor: "pointer", mr: 0.5 }} aria-label="Add New Opportunity" />
        <Typography variant="h6" color="primary.main" fontWeight={600}>
          Add New Opportunity
        </Typography>
      </IconButton>
      </Box>
      <CommonTable fetchRows={fetchRows} columns={columns} />
    </Box>
  );
}
