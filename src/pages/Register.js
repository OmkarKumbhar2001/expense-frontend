import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {  IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import { GoogleLogin } from "@react-oauth/google";
import "./css/login.css";
import Or from "./assets/OR.png";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../services/user-service";
import { toast } from "react-hot-toast";
import { doLogin, isLoggedIn } from "../auth";
import LoadingButton from '@mui/lab/LoadingButton';
import Footer from "../components/Footer";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    if (isLoggedIn()) {
      navigate("/dashboard")
    }
  },[navigate])
  const getTextFieldStyles = () => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', 
      },
      '&:hover fieldset': {
        borderColor: 'white', 
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white', 
      },
    },
  });
  const [showPassword, setShowPassword] = useState(false);
 
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    setLoading(false)
    let isValid = true;
    const newErrors = { ...formErrors };

    // Check if fields are empty
    for (const key in formData) {
      if (!formData[key]) {
        newErrors[key] = "This field is required.";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    setLoading(true)
    if (validateForm()) {
      SignUp(formData).then((response)=>{
        setLoading(false)
        doLogin(response?.data,()=>{
          toast.success("User Register In Successfully",{
            position:"top-right"
          })
        })
        navigate("/dashboard")
      }).catch((error)=>{
        setLoading(false)
        console.log(error)
        if(error?.message==="Network Error"){
          toast.error("Server is Not Running Sorry Try Some time letter")
        }
        if(error?.response?.status===409){
          toast.error("Username or Email Already register")
          setFormData({
            ...formData,
            email: "",
            username: "",
          });
        }
      })
    }
  };

  const authGoogleLogin = (token) => {
    toast.success("We are Working on it please try to register by form ",{
      icon:"🤩"
     });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
    <div className="Login">
      <div className="login-form">
        <h1>Register</h1>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-email-required"
            label="Please enter email"
            autoComplete="off"
            size="small"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            InputProps={{style: { color: "white" },}}
            InputLabelProps={{style: { color: "white" }, }}
            sx={getTextFieldStyles()}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-username-required"
            label="username"
            autoComplete="off"
            size="small"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!formErrors.username}
            helperText={formErrors.username}
            InputProps={{style: { color: "white" },}}
            InputLabelProps={{style: { color: "white" }, }}
            sx={getTextFieldStyles()}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-name-required"
            label="Name"
            autoComplete="off"
            size="small"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={!!formErrors.fullName}
            helperText={formErrors.fullName}
            InputProps={{style: { color: "white" },}}
            InputLabelProps={{style: { color: "white" }, }}
            sx={getTextFieldStyles()}
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
            error={!!formErrors.password}
            helperText={formErrors.password}
          
            InputLabelProps={{style: { color: "white" }, }}
            sx={getTextFieldStyles()}
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
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            id="outlined-confirm-password"
            type={showPassword ? "text" : "password"}
            size="small"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            InputLabelProps={{style: { color: "white" }, }}
            sx={getTextFieldStyles()}
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
          />
        </div>
        <p className="donthaveaccount" onClick={handleLogin}>
          Already Have an Account? <b> Login</b>
        </p>
        <div>
          <LoadingButton loading={loading} fullWidth variant="contained" endIcon={<SendIcon />} onClick={handleRegister}>
          Register
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

export default Register;