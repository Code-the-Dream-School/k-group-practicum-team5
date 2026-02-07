import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { staffService } from "../services/staff.service";
import type { Staff } from "../types/staff.types";
import StaffCard from "../components/StaffCard";

export default function StaffDirectory() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
//   console.log("staff state:", staff)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await staffService.getAll({ search, department });
        // console.log("data:", data)
        setStaff(Array.isArray(data)? data:[]);
      } catch (err) {
        console.error(err);
        setStaff([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [search, department]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Staff Directory
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Animals">Animals</MenuItem>
          <MenuItem value="Education">Education</MenuItem>
          <MenuItem value="Guest Services">Guest Services</MenuItem>
          <MenuItem value="Management">Management</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
          <MenuItem value="Event Assistance">Event Assistance</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {staff.filter(Boolean).map((s) => (
            <Grid key={s._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <StaffCard staff={s} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
