import React from "react";
import { Button, Form } from "react-bootstrap";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <div className="signup-page d-flex">
      <div className="left-side">
        <img src="landing_image.jpg" alt="Background" className="img-fluid" />
      </div>
      <div className="right-side d-flex flex-column justify-content-center">
        <h1>Sign Up</h1>
        <Form>
          <Form.Group controlId="formName" className="form-group">
            <Form.Label className="form-label">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              className="form-control"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="btn-primary">
            Sign Up
          </Button>

          <div className="or-separator">or</div>

          <div className="social-buttons">
          <Button variant="primary" type="button" className="btn-google">
            Google
          </Button>
          <Button variant="primary" type="button" className="btn-facebook">
            Facebook
          </Button>
          </div>

          <p className="sign-in mt-3">
            Do you have an account?{" "}
            <a href="/signin" onClick={handleSignInClick}>
              Sign In
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
