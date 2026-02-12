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
import { useTranslation } from "react-i18next";

export default function StaffDirectory() {
  const { t } = useTranslation();
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
        setStaff(Array.isArray(data) ? data : []);
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
        {t("staff.title")}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {t("staff.subtitle")}
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label={t("staff.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label={t("staff.department")}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">{t("staff.departments.all")}</MenuItem>
          <MenuItem value="Animals">{t("staff.departments.animals")}</MenuItem>
          <MenuItem value="Education">
            {t("staff.departments.education")}
          </MenuItem>
          <MenuItem value="Guest Services">
            {t("staff.departments.guestServices")}
          </MenuItem>
          <MenuItem value="Management">
            {t("staff.departments.management")}
          </MenuItem>
          <MenuItem value="Maintenance">
            {t("staff.departments.maintenance")}
          </MenuItem>
          <MenuItem value="Event Assistance">
            {t("staff.departments.eventAssistance")}
          </MenuItem>
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
