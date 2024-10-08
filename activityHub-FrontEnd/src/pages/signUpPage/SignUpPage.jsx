import { Form, Button, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./SignUpPageCss.css";
import { useState } from "react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({});

  // This function is to handle and set changes to the input fields and stored in formData
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // This function is to submit the formData when all validations are complete
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here will implement logic to submit the form data to your backend API
    console.log(formData);
  };

  return (
    <Container className="signUpContainter">
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" className="logoStyle" />
        <h2 className="mt-3">Sign Up</h2>
      </div>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            placeholder="Enter full name"
            className="mb-3"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            className="mb-3"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            className="mb-3"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="mb-4"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 btn-lg">
          Sign Up
        </Button>

        <div className="mt-3 text-center">
          <span>
            Already have an account? <a href="/sign-in">Sign In</a>
          </span>
        </div>
      </Form>
    </Container>
  );
}
