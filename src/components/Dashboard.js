import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  const [email, setEmail] = useState("");

  const location = useLocation();

  useEffect(() => {
    // Parse query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");

    if (emailParam) {
      setEmail(emailParam);
    }

    // Read auth data from the cookie
    const cookieData = Cookies.get("authData");
    if (cookieData) {
      try {
        JSON.parse(cookieData); // Process cookie data (unused)
      } catch (error) {
        console.error("Error parsing cookie data:", error);
      }
    } else {
      console.error("No data found in cookie.");
    }
  }, [location.search]);

  const handleLogout = () => {
    // Handle logout logic here
    Cookies.remove("authData"); // Remove cookie
    window.location.href = "/signin"; // Redirect to sign-in page
  };

  return (
    <div>
      <Navbar className="custom-navbar" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Task Management App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <NavDropdown className="custom-dropdown" title={email || "No email provided"} id="basic-nav-dropdown">
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <h1>Dashboard</h1>
        {/* Add any other content or components here */}
      </div>
    </div>
  );
};

export default Dashboard;
