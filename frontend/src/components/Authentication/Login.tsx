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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
 import {  loginApi } from "@/api/apiLogin";
import axios from "axios";
import reptileImage from "@/assets/logo/reptile1.jpeg";
import { useAuth } from "@/hooks/useAuth";
import BasicAlert from "../alert/BasicAlert";


interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
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
  const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password: string) =>
  password.length >= 6;

  const validate = () => {
    const newErrors = {
      email: formData.email.trim() === ""||!isValidEmail(formData.email),
      password: formData.password.trim() === ""||!isValidPassword(formData.password),
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
    
    const res = await loginApi(formData);

    login({
    id: res.user.id,
    fullName: res.user.fullName ,
    email: res.user.email,
    is_admin: res.user.is_admin ?? false,
  }, 
  res.token);
     setAlert({
    message: "Login successful ",
    severity: "success",
  });
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setAlert({message: err.response?.data?.error || "Invalid email or password", severity: "error",});
      } else {
        setAlert({
      message: "Login failed",
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
            Login
          </Typography>

          {alert && (
            <BasicAlert
              message={alert.message}
              severity={alert.severity}
            />
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              helperText={errors.email && "Enter a valid email address"}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              helperText={errors.password && "Password must be at least 6 characters"}
              slotProps={{
                input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
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
              {loading ? <CircularProgress size={22} /> : "Login"}
            </Button>
          </Box>
        </CardContent>

        <Box
          sx={{
            flex: 1,
            display: { xs: "stack", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={reptileImage}
            alt="Reptile"
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

export default Login;
