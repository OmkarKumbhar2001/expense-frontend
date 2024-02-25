import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import { GoogleLogin } from '@react-oauth/google';
import "./css/login.css";
import Or from "./assets/OR.png"
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const authGoogleLogin = (token)=>{
      
      console.log(token)
  } 
  const handleLogin = () => {
    navigate("/login");
}
    return (
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
          <div>
            <TextField
              fullWidth
              required
              id="outlined-confirm-password"
              type={showPassword ? "text" : "password"}
              size="small"
              label="Confirm Password"
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
          <p className="donthaveaccount" onClick={handleLogin}>
          Already Have an Account? <b > Login</b>
                        </p>
          <div>
            <Button fullWidth variant="contained" endIcon={<SendIcon />}>
              Register
            </Button>
          </div>
          <div className="orImgClass">
              <img className="orImg" src={Or} alt="Or Img" />
          </div>
          <div className="orImgClass">
          <GoogleLogin
                                  onSuccess={credentialResponse => {
                                      authGoogleLogin(credentialResponse.credential);
                                  }}
                                  onError={() => {
                                      console.log('Login Failed');
                                  }}
  
                              />
          </div>
        </div>
      </div>
    );
}

export default Register;