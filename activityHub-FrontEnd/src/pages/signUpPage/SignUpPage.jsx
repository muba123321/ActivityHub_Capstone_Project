import { Form, Button, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./SignUpPageCss.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleChange,
  handleSubmit,
} from "./signUpControllers/fromControllers";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpPage() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container className="signUpContainter">
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" className="logoStyle" />
        <h2 className="mt-3">Sign Up</h2>
      </div>
      <hr />
      <Form onSubmit={(e) => handleSubmit(e, formData, dispatch, navigate)}>
        <Form.Group controlId="formFullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter full name"
            className="mb-3"
            disabled={loading}
            onChange={(e) => handleChange(e, formData, setFormData, dispatch)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            className="mb-3"
            disabled={loading}
            onChange={(e) => handleChange(e, formData, setFormData, dispatch)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            disabled={loading}
            className="mb-3"
            onChange={(e) => handleChange(e, formData, setFormData, dispatch)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            disabled={loading}
            className="mb-4"
            onChange={(e) => handleChange(e, formData, setFormData, dispatch)}
            required
          />
        </Form.Group>

        <Button
          disabled={loading}
          variant="primary"
          type="submit"
          className="w-100 btn-lg"
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        {error && (
          <div className="text-danger mt-2">
            <p>{error}</p>
          </div>
        )}

        <div className="mt-3 text-center">
          <span>
            Already have an account? <a href="/sign-in">Sign In</a>
          </span>
        </div>
      </Form>
    </Container>
  );
}
