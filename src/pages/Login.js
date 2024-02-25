import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
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
const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if (isLoggedIn()) {
      navigate("/dashboard")
    }
  },[navigate])
  const [showPassword, setShowPassword] = useState(false);
  
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
    console.log(token);
  };
  const signup = () => {
    navigate("/register");
  };
  
  const validator =(data)=>{
    for (const field in data) {
      if (!data[field]) {
        toast.error(`Error: ${field} is empty`)
        console.log(`Error: ${field} is empty`);
        return false;
      }
    }
    return true;
  }
  const handleLogin = () => {
    if(validator(formData))
      UserLogin(formData).then((response)=>{
        console.log(response)
        doLogin(response?.data,()=>{
          toast.success("User Login In Successfully",{
            position:"top-right"
           
          })
        })
        navigate("/dashboard")
      }).catch((error)=>{
        if(error?.message==="Network Error"){
          toast.error("Server Probelm please try again after some time");
        }
        console.log(error)
        if(error?.response?.status===404||error?.response?.status===401){
          toast.error("Unauthorized");
        }
      })

  };

  return (
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
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} 
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
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} 
            InputProps={{
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
        <p className="donthaveaccount" onClick={signup}>
          Don't Have an Account?<b> Signup</b>
        </p>
        <div>
          <Button fullWidth variant="contained" endIcon={<SendIcon />} onClick={handleLogin}>
            Login
          </Button>
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
  );
};

export default Login;
