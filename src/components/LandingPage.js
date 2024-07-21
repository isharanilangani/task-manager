import React from "react";
import { Button } from "react-bootstrap";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/signup");
  };
  return (
    <div className="landing-page d-flex">
      <div className="left-side">
        <img src="landing_image.jpg" alt="Background" className="img-fluid" />
      </div>
      <div className="right-side d-flex flex-column justify-content-center">
        <h1>Task Management App</h1>
        <p>
          Manage your tasks efficiently with our user-friendly task management
          app. Stay organized and boost your productivity.
        </p>
        <Button
          variant="primary"
          className="get-started"
          onClick={handleGetStartedClick}
        >
          Get Started
        </Button>
        <p className="sign-in">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
