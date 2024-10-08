import { Form, Button, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./SignUpPageCss.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [successMessage, setSuccessMessage] = useState(null);

  // This function is to handle and set changes to the input fields and stored in formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // this is to clear  errors for the specific field when valid input is provided
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  // email validation using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    const errors = {};

    //Password requirement
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one number";
    }

    // Checking if password match
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const validateForm = () => {
    const validationErrors = validatePassword();
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    return validationErrors;
  };

  // This function is to submit the formData when all validations are complete
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    // Here will implement logic to submit the form data to your backend AP

    if (Object.keys(validationErrors).length === 0) {
      const { confirmPassword, ...dataToSubmit } = formData;
      try {
        setLoading(true);
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        });
        const data = await res.json();

        if (!data.success) {
          setErrors({ api: data.message });
          setLoading(false);
          return;
        }
        setLoading(false);
        setErrors({});
        navigate("/");
      } catch (err) {
        console.error(err);
        setErrors({ api: "Something went wrong. Please try again later." });
        setLoading(false);
      }
    }
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
            name="name"
            placeholder="Enter full name"
            className="mb-3"
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
          {errors.email && (
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            className="mb-3"
            onChange={handleChange}
            required
          />
          {errors.password && (
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="mb-4"
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <Form.Text className="text-danger">
              {errors.confirmPassword}
            </Form.Text>
          )}
        </Form.Group>

        <Button
          disabled={loading}
          variant="primary"
          type="submit"
          className="w-100 btn-lg"
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        {errors.api && (
          <div className="text-danger mt-3">
            <p>{errors.api}</p>
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
