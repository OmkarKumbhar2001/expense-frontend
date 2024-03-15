import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import "../css/home.css";
import { Zoom } from "react-awesome-reveal";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../auth";
import { Button } from "@mui/material";
import { Rating } from "../../data/rating";
import RatingCard from "../../components/RateingCard/RatingCard";
import GridLines from "react-gridlines";
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
      <GridLines
        className="grid-area"
        cellWidth={90}
        strokeWidth={0.1}
        cellWidth2={0}
      >
        <div className="home">
          <div className="loging-button-home">
            <Button onClick={() => goToRegister("login")}>Login</Button>
          </div>
          <div className="landingpage">
            <Zoom cascade damping={0.1}>
              <h1 className="animate__slower">
                Visualize Your Spending Patterns
              </h1>
            </Zoom>
            <div>
              <Fade delay="45">
                <button
                  className="tryit-button"
                  onClick={() => goToRegister("register")}
                >
                  Try It
                </button>
              </Fade>
            </div>
          </div>

          <div className="rating-in-home">
            {Rating.map((rate, i) => {
              return (
                <RatingCard
                  key={i}
                  rating={rate.rating}
                  name={rate.name}
                  describe={rate.describe}
                />
              );
            })}
          </div>
        </div>
      </GridLines>

      <Footer />
    </>
  );
};

export default Home;
