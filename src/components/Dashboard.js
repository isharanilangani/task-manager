import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { Navbar, Container, NavDropdown, Modal, Button, Form } from "react-bootstrap";
import axios from "axios"; // Import axios for API calls
import "./Dashboard.css";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Store user's name
  const [userId, setUserId] = useState(""); // Store user ID from cookie
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Parse query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");

    if (emailParam) {
      setEmail(emailParam);
    }

    // Read auth data from the cookie and extract user ID
    const cookieData = Cookies.get("authData");
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        setUserId(parsedData.id);
      } catch (error) {
        console.error("Error parsing cookie data:", error);
      }
    } else {
      console.error("No data found in cookie.");
    }
  }, [location.search]);

  const fetchUserName = async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/name/${userId}`);
        setName(response.data); // Set the fetched name
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    }
  };

  const handleSettingsClick = () => {
    fetchUserName(); // Fetch the user's name when opening the settings modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
              <NavDropdown.Item onClick={handleSettingsClick}>Settings</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name} 
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email} // Set the value of the email field
                readOnly // Make the email field read-only
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <h1>Dashboard</h1>
        {/* Add any other content or components here */}
      </div>
    </div>
  );
};

export default Dashboard;
