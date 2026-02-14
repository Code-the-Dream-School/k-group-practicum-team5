import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import reptileImage from "@/assets/logo/reptile3.jpg";
import { forgotPasswordApi } from "@/api/apiForgotPassword";
import BasicAlert from "../alert/BasicAlert";

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    severity: "success" | "info" | "warning" | "error";
  } | null>(null);

  const handleClose = () => {
    navigate("/");
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
  };

  const handleBlur = () => {
    setError(formData.email.trim() === "" || !isValidEmail(formData.email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!isValidEmail(formData.email)) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      await forgotPasswordApi(formData.email, i18n.language);

      setAlert({
        message: t("forgotPassword.success"),
        severity: "success",
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlert({
          message: err.response?.data?.message || t("forgotPassword.failed"),
          severity: "error",
        });
      } else {
        setAlert({
          message: t("forgotPassword.failed"),
          severity: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="background.default"
    >
      <Card
        sx={{
          width: { xs: "100%", md: 900 },
          minHeight: { xs: "auto", md: 520 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          position: "relative",
          p: { xs: 2, md: 4 },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}
          aria-label={t("forgotPassword.closeAria")}
        >
          <CloseIcon />
        </IconButton>
        <CardContent
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" color="primary" mb={2}>
            {t("forgotPassword.title")}
          </Typography>

          <Typography variant="h6" color="secondary" mb={3}>
            {t("forgotPassword.subtitle")}
          </Typography>

          {alert && (
            <BasicAlert message={alert.message} severity={alert.severity} />
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label={t("forgotPassword.fields.email")}
              name="email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error}
              helperText={error && t("forgotPassword.errors.email")}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} />
              ) : (
                t("forgotPassword.submit")
              )}
            </Button>
          </Box>

          <Typography variant="h5" color="primary" mt={4}>
            {t("forgotPassword.remember")}{" "}
            <Link
              component={RouterLink}
              to="/login"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              {t("forgotPassword.login")}
            </Link>
          </Typography>
        </CardContent>
        <Box
          sx={{
            flex: 1,
            display: { xs: "small", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={reptileImage}
            alt={t("forgotPassword.imageAlt")}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 2,
              backgroundSize: "contain",
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
