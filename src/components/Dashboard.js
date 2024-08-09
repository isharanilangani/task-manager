import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { Navbar, Container, NavDropdown, Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios"; 
import "./Dashboard.css";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); 
  const [userId, setUserId] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get("email");

    if (emailParam) {
      setEmail(emailParam);
    }

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
        setName(response.data); 
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    }
  };

  const handleSettingsClick = () => {
    fetchUserName(); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage(""); 
    setSuccessMessage(""); 
  };

  const handleLogout = () => {
    Cookies.remove("authData"); 
    window.location.href = "/signin"; 
  };

  const handleSaveChanges = async () => {
    if (!userId) return;

    try {
      const response = await axios.put(`http://localhost:8080/api/users/update/${userId}`, {
        name,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage("User updated successfully."); 
        setName(response.data.name); 
        setShowModal(false); 

        // Automatically remove the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("Failed to update user."); 

      // Automatically remove the error message after 3 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
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

      {/* Display the success message if it exists, outside the modal */}
      {successMessage && (
        <Alert variant="success" className="m-3">
          {successMessage}
        </Alert>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display the error message inside the modal if it exists */}
          {errorMessage && (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          )}

          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email} 
                readOnly 
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
