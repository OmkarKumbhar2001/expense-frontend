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
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
  const data = [
    { name: "Jan", uv: 4000, pv: 2400 },
    { name: "Feb", uv: 3000, pv: 1398 },
    { name: "Mar", uv: 2000, pv: 9800 },
    { name: "Apr", uv: 2780, pv: 3908 },
    { name: "May", uv: 1890, pv: 4800 },
    { name: "Jun", uv: 2390, pv: 3800 },
    { name: "Jul", uv: 3490, pv: 4300 },
    { name: "Aug", uv: 4000, pv: 2400 },
    { name: "Sep", uv: 3000, pv: 1398 },
    { name: "Oct", uv: 2000, pv: 9800 },
    { name: "Nov", uv: 2780, pv: 3908 },
    { name: "Dec", uv: 1890, pv: 4800 },
  ];
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
      <div className="home-appdetails">
        <h1>Service</h1>
        <div className="home-dummy-chart-information">
          <div>
            <LineChart width={500} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="black" strokeDasharray="1" />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            </LineChart>
          </div>
          <div className="chart-info">
            <h2>Track your monthly spending</h2>
            <p>Visualize and manage your monthly spending effortlessly with our intuitive app. Track your expenses, analyze spending patterns, and stay on top of your financial goals. Gain valuable insights to make informed decisions and achieve financial stability. Take control of your finances today!</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
