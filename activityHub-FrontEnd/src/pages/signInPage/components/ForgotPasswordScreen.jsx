import React, { useState } from "react";
import { auth } from "../../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./ForgotPasswordScreen.css";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if email is valid and disable the button
    if (!validateEmail(email)) {
      setError("Invalid email format. Please enter a valid email.");
      return;
    }

    setIsButtonDisabled(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (err) {
      setMessage("");
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsButtonDisabled(false); // Re-enable the button after request is complete
    }
  };

  const validateEmail = (email) => {
    // Basic email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <Container className="forgot-password-container d-flex align-items-center justify-content-center">
      <div className="forgot-password-card">
        <h2 className="text-center mb-4">Forgot Password</h2>
        <Form onSubmit={handleResetPassword}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="custom-input"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3"
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? "Sending..." : "Send Reset Email"}
          </Button>
          {message && (
            <Alert variant="success" className="mt-3">
              {message}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Form>
      </div>
    </Container>
  );
}
