import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import { GoogleLogin } from "@react-oauth/google";
import "./css/login.css";
import Or from "./assets/OR.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserLogin } from "../services/user-service";
import { doLogin, isLoggedIn } from "../auth";
import Footer from "../components/Footer";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const authGoogleLogin = (token) => {
    toast.success("We are Working on it please try to login  by form ", {
      icon: "🤩",
    });
  };
  const signup = () => {
    navigate("/register");
  };

  const validator = (data) => {
    for (const field in data) {
      if (!data[field]) {
        toast.error(`Error: ${field} is empty`);
        setLoading(false);
        console.log(`Error: ${field} is empty`);
        return false;
      }
    }
    return true;
  };
  const handleLogin = () => {
    setLoading(true);
    if (validator(formData))
      UserLogin(formData)
        .then((response) => {
          doLogin(response?.data, () => {
            toast.success("User Login In Successfully");
            setLoading(false);
          });
          navigate("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          if (error?.message === "Network Error") {
            toast.error("Server Probelm please try again after some time");
          }
          console.log(error);
          if (
            error?.response?.status === 404 ||
            error?.response?.status === 401
          ) {
            toast.error("Unauthorized");
          }
        });
  };

  return (
    <>
      <div className="Login">
        <div className="login-form">
          <h1>Login</h1>
          <div>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Please enter email"
              autoComplete="off"
              size="small"
              name="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{ style: { color: "white", border: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // border color on focus
                  },
                },
              }}
            />
          </div>
          <div>
            <TextField
              fullWidth
              required
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              size="small"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                style: { color: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // border color on focus
                  },
                },
              }}
            />
          </div>
          <p className="donthaveaccount" onClick={signup}>
            Don't Have an Account?<b> Signup</b>
          </p>
          <div>
            <LoadingButton
              loading={loading}
              fullWidth
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleLogin}
            >
              Login
            </LoadingButton>
          </div>
          <div className="orImgClass">
            <img className="orImg" src={Or} alt="Or Img" />
          </div>
          <div className="orImgClass">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                authGoogleLogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
