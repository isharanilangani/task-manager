import React from "react";
import { Button, Form } from "react-bootstrap";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="signup-page d-flex">
      <div className="left-side">
        <img src="landing_image.jpg" alt="Background" className="img-fluid" />
      </div>
      <div className="right-side d-flex flex-column justify-content-center">
        <h1>Sign In</h1>
        <Form>
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
          
          <div className="signup-button">
          <Button variant="primary" type="submit" className="btn-primary">
            Sign In
          </Button>
          </div>

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
            Don't you have an account?{" "}
            <a href="/signup" onClick={handleSignUpClick}>
              Sign Up
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
