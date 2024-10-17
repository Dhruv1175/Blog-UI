import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import QuizPopup from "./QuizPopUp";
import { useAuth } from "./AuthContext";


const NavBar = () => {
  const {isLoggedIn, setIsLoggedIn} = useAuth(); 
  const navigate = useNavigate()
  const username = localStorage.getItem("uname")
  const pUrl = localStorage.getItem("pUrl")
  const role = useState("Viewer")
  const handleLogin = () => {
    navigate("/")
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false)
  };

  return (
    <>
    <QuizPopup/>
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
      <Navbar.Brand as={Link} to="/home">BlogHub</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          <Nav.Link as={Link} to="/addquery">Query</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
        </Nav>

        {!isLoggedIn ? (
          <Button variant="outline-light" onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <NavDropdown
            title={
              <>
                <Image
                  src={pUrl}
                  roundedCircle
                  width="30"
                  height="30"
                  className="mr-2"
                />
                {username} - {role}
              </>
            }
            id="basic-nav-dropdown"
            alignRight
          >
            <NavDropdown.Item as={Link} to="/profile">
              <FaUser className="mr-2" /> Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/settings">
              <FaCog className="mr-2" /> Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
              <FaSignOutAlt className="mr-2" /> Logout
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Navbar.Collapse>

      <Nav className="ml-3">
  <Nav.Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook-f"></i>
  </Nav.Link>
  <Nav.Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-twitter"></i>
  </Nav.Link>
  <Nav.Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-youtube"></i>
  </Nav.Link>
  <Nav.Link href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-pinterest"></i>
  </Nav.Link>
</Nav>

    </Navbar>
    </>
  );
};

export default NavBar;
