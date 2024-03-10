import React, { useEffect, useState } from 'react'
import "./css/customNavbar.css"
import { getCurrentUser } from '../auth';
import LoginSideBar from './LoginSideBar';
const CustomNavbar = () => {
    const [username, setUsername] = useState("");
    useEffect(()=>{
        setUsername(getCurrentUser());
    },[])
    // const logout = () => {
    //     doLogout(() => {
    //       navigate("/login");
    //     });
    //   };
  return (
    <div className="main_usernav">
        <h1>Hi {username} 👋</h1>

        {/* <Button variant="contained" onClick={logout}>
          Logout{" "}
        </Button> */}
        <LoginSideBar />
      </div>
  )
}

export default CustomNavbar