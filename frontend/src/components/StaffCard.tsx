import { Card, Typography, Avatar, Box } from "@mui/material";
import type { Staff } from "../types/staff.types";

type StaffCardProps={
    staff:Staff;
}
export default function StaffCard({ staff }: StaffCardProps) {

  return (
    
    <Card sx={{ p: 2, borderRadius: 3, transition: "0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 4,
    },}}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          src={staff.image || ""}
          sx={{ width: 100, height: 100, margin: "0 auto 12px" }}
          >
            {!staff.image && staff.name[0]}
            </Avatar>
        <Typography fontWeight="bold">{staff.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {staff.role}
        </Typography>
        <Typography variant="caption">{staff.department}</Typography>
      </Box>

      {staff.bio && (
        <Typography mt={2} variant="body2">
          {staff.bio}
        </Typography>
      )}
    </Card>
  );
}
