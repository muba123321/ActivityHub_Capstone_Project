import { Navbar, Nav, Form, Button, Dropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
import profileImage from "../assets/activityPoster.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const user = currentUser.user;

  const firstName = currentUser ? user.name.split(" ")[0] : "";

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("User logged out");
    navigate("/sign-in");
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="mb-3"
      style={{ padding: "10px 20px" }}
    >
      <Navbar.Brand href="/" className="align-items-center text-center">
        <img src={logo} width="45" height="45" alt="Logo" /> ActivityHub
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {currentUser ? (
          <>
            <Form className="d-flex mx-auto" style={{ width: "400px" }}>
              <Form.Control
                type="search"
                placeholder="Search activities..."
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <img
                  src={user.avatar}
                  alt="Profile"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <span className="ms-2">{firstName}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <Nav className="ms-auto">
            <Nav.Link href="/sign-up">
              <Button variant="primary">Sign Up</Button>
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
