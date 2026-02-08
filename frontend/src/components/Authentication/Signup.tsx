import { useState } from "react";
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { signup } from "@/api/apiSignup";
import reptileImage from "@/assets/logo/reptile1.webp";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import BasicAlert from "../alert/BasicAlert";
import { useTranslation } from "react-i18next";

interface SignupForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleClose = () => {
    navigate("/");
  };

  const [formData, setFormData] = useState<SignupForm>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    severity: "success" | "info" | "warning" | "error";
  } | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string) => password.length >= 6;

  const validate = () => {
    const newErrors = {
      first_name: formData.first_name.trim() === "",
      last_name: formData.last_name.trim() === "",
      email: formData.email.trim() === "" || !isValidEmail(formData.email),
      password:
        formData.password.trim() === "" || !isValidPassword(formData.password),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const res = await signup(formData);
      login(res.user, res.token);
      setAlert({
        message: t("signup.success"),
        severity: "success",
      });
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlert({
          message: err.response?.data?.error || t("signup.failed"),
          severity: "error",
        });
      } else {
        setAlert({
          message: t("signup.failed"),
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
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 1,
          }}
          aria-label={t("signup.closeAria")}
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
            {t("signup.title")}
          </Typography>
          <Typography variant="h5" color="primary" mb={2}>
            {t("signup.already")}{" "}
            <Link
              component={RouterLink}
              to="/login"
              color="secondary"
              sx={{ fontWeight: 600 }}
            >
              {t("signup.login")}
            </Link>
          </Typography>

          {alert && (
            <BasicAlert message={alert.message} severity={alert.severity} />
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label={t("signup.fields.firstName")}
              name="first_name"
              fullWidth
              required
              margin="normal"
              value={formData.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.first_name}
            />

            <TextField
              label={t("signup.fields.lastName")}
              name="last_name"
              fullWidth
              required
              margin="normal"
              value={formData.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.last_name}
            />

            <TextField
              label={t("signup.fields.email")}
              name="email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              helperText={errors.email && t("signup.errors.email")}
            />

            <TextField
              label={t("signup.fields.password")}
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              helperText={errors.password && t("signup.errors.password")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        aria-label={t("signup.togglePassword")}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} /> : t("signup.submit")}
            </Button>
          </Box>
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
            alt={t("signup.imageAlt")}
            sx={{
              width: "100%",
              height: "100%",
              backgroundSize: "contain",
              borderRadius: 2,
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default Signup;
