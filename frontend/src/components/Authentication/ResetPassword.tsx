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
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { resetPasswordApi } from "@/api/apiResetPassword";
import reptileImage from "@/assets/logo/reptile4.webp";
import BasicAlert from "../alert/BasicAlert";
import { useTranslation } from "react-i18next";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const [formData, setFormData] = useState<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    severity: "success" | "info" | "warning" | "error";
  } | null>(null);

  const handleClose = () => navigate("/");

  const isValidPassword = (password: string) => password.length >= 6;

  const validate = () => {
    const newErrors = {
      password: !isValidPassword(formData.password),
      confirmPassword:
        formData.confirmPassword !== formData.password ||
        formData.confirmPassword === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!validate() || !token) return;

    try {
      setLoading(true);

      await resetPasswordApi(token, formData.password);
      setAlert({
        message: t("resetPassword.success"),
        severity: "success",
      });

      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlert({
          message:
            err.response?.data?.message || t("resetPassword.invalidLink"),
          severity: "error",
        });
      } else {
        setAlert({
          message: t("resetPassword.failed"),
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
          sx={{ position: "absolute", top: 12, right: 12 }}
          aria-label={t("resetPassword.closeAria")}
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
            {t("resetPassword.title")}
          </Typography>

          <Typography variant="h6" color="secondary" mb={3}>
            {t("resetPassword.subtitle")}
          </Typography>

          {alert && (
            <BasicAlert message={alert.message} severity={alert.severity} />
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label={t("resetPassword.fields.newPassword")}
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password && t("resetPassword.errors.min")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                        aria-label={t("resetPassword.togglePassword")}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label={t("resetPassword.fields.confirmPassword")}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              helperText={
                errors.confirmPassword && t("resetPassword.errors.mismatch")
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((p) => !p)}
                        edge="end"
                        aria-label={t("resetPassword.toggleConfirm")}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
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
                t("resetPassword.submit")
              )}
            </Button>
          </Box>

          <Typography variant="h6" align="center" mt={3}>
            <Link
              component={RouterLink}
              to="/login"
              color="secondary"
              fontWeight={600}
            >
              {t("resetPassword.backToLogin")}
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
            alt={t("resetPassword.imageAlt")}
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

export default ResetPassword;
