import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least one letter, one number, one special character, and 8-16 characters long
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value) ? "" : "Please enter a valid email address.",
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value)
        ? ""
        : "Password must be 8-16 characters, include letters, numbers, and symbols.",
    }));
  };

  const handleBlur = (field, value) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = email
      ? validateEmail(email)
        ? ""
        : "Please enter a valid email address."
      : "Email is required.";
    const passwordError = password
      ? validatePassword(password)
        ? ""
        : "Password must be 8-16 characters, include letters, numbers, and symbols."
      : "Password is required.";

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    } else {
      console.log("Form submitted successfully");
    }
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
