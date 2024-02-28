import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import "../css/home.css";
import { Zoom } from "react-awesome-reveal";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../auth";
import { Button } from "@mui/material";
import TryIcon from "@mui/icons-material/Try";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);
  const goToRegister = (path) => {
    navigate(`/${path}`);
  };
  return (
    <>
      <div className="home">
        <div className="loging-button-home">
          <Button onClick={()=>goToRegister("login")}>Login</Button>
        </div>
        <div className="landingpage">
          <Zoom cascade damping={0.1}>
            <h1 className="animate__slower">
              Visualize Your Spending Patterns,{" "}
            </h1>
            <h1>Empower Your Financial Choices.</h1>
          </Zoom>
        </div>
        <div>
          <Fade delay="45">
            <Button
              color="secondary"
              size="large"
              variant="contained"
              endIcon={<TryIcon />}
              onClick={()=>goToRegister("register")}
            >
              Try It
            </Button>
          </Fade>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
