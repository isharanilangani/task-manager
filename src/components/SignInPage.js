import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import "./SignUpPage.css";

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: getEmailError(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: getPasswordError(value),
    }));
  };

  const handleBlur = (field, value) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = getEmailError(email);
    const passwordError = getPasswordError(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/login",
          null,
          {
            params: { email, password },
            headers: { "Content-Type": "application/json" },
          }
        );

        const responseData = response.data; // Retrieve the entire response data
        if (responseData) {
          const { id } = responseData; // Assuming response contains the id field
          Cookies.set("authData", JSON.stringify(responseData), { expires: 7 }); // Store the entire response data in cookie
          navigate(`/dashboard?email=${encodeURIComponent(email)}&id=${id}`);
        } else {
          setApiError("Failed to retrieve data from the server.");
        }
      } catch (error) {
        if (error.response) {
          setApiError(
            "Login failed. Please check your credentials and try again."
          );
        } else if (error.request) {
          setApiError("Network error. Please try again later.");
        } else {
          setApiError("An unexpected error occurred.");
        }
      }
    }
  };

  const getEmailError = (email) => {
    if (!email) {
      return "Email is required.";
    }
    if (!validateEmail(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const getPasswordError = (password) => {
    if (!password) {
      return "Password is required.";
    }
    if (!validatePassword(password)) {
      return "Password must be 8-16 characters, include letters, numbers, and symbols.";
    }
    return "";
  };

  return (
    <div className="signup-page d-flex">
      <div className="left-side">
        <img src="landing_image.jpg" alt="Background" className="img-fluid" />
      </div>
      <div className="right-side d-flex flex-column justify-content-center">
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label className="form-label">
              <span className="text-danger">*</span> Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => handleBlur("email", email)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label className="form-label">
              <span className="text-danger">*</span> Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur("password", password)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {apiError && (
            <div className="alert alert-danger" role="alert">
              {apiError}
            </div>
          )}

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
