import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./SignInPageCss.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

export default function SignInPage() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  // const [errors, setErrors] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This function is to handle and set changes to the input fields and stored in formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when the user modifies the input
    dispatch(signInFailure(null));
  };

  const validateInput = () => {
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Email and Password are required"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors(null); // Clear previous errors
    // Client-side input validation
    if (!validateInput()) {
      return;
    }

    try {
      // This signs in the user with firebase
      dispatch(signInStart());
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // lets get the user token from firebase
      const idToken = await user.getIdToken();

      // We send the idToken to the backend to validate and retrieve User data
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ uid: user.uid }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        // If the backend responds with an error
        dispatch(signInFailure(data.message || "Authentication Failed"));
        // setLoading(false);
        // setErrors(data.message || "Authentication Failed");
        return;
      }
      dispatch(signInSuccess(data));
      // setLoading(false);
      // setErrors(null);
      navigate("/");
    } catch (err) {
      console.log(err);

      if (err.code === "auth/invalid-credential") {
        dispatch(signInFailure("Invalid Credential"));
        // setErrors("Invalid Credential");
      } else {
        dispatch(
          signInFailure(err.message || "An error occurred during sign-in")
        );
        // setErrors(err.message || "An error occurred during sign-in");
      }
    }
  };

  return (
    <Container className="signInContainter">
      <div className="text-center mb-4 ">
        <img className="logoStyle" src={logo} alt="Logo" />
        <h2 className="mt-3">Sign In</h2>
      </div>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            className="mb-3"
            disabled={loading}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4"
            disabled={loading}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          disabled={loading}
          variant="primary"
          type="submit"
          className="w-100 btn-lg"
        >
          {loading ? "Loading..." : "Sign In"}
        </Button>

        {/* Will implement google signIn in the next mvp */}
        <Button
          variant="primary"
          type="submit"
          className="googleButton w-100 btn-lg"
        >
          Google
        </Button>
        {error && (
          <div className="text-danger mt-2">
            <p>{error}</p>
          </div>
        )}
        {/* The forget Password will be implemented either in this scope MVP1 or the next Scope depending on the time. */}
        <div className="mt-3 text-center">
          <a href="/forgot-password">Forgot password?</a>
        </div>

        <div className="mt-3 text-center">
          <span>
            Don’t have an account? <a href="/sign-up">Sign Up</a>
          </span>
        </div>
      </Form>
    </Container>
  );
}
