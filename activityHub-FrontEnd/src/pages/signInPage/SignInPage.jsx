import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./SignInPageCss.css";

export default function SignInPage({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();

    setIsAuthenticated(true);

    navigate("/");
  };

  return (
    <Container className="signInContainter">
      <div className="text-center mb-4 ">
        <img className="logoStyle" src={logo} alt="Logo" />
        <h2 className="mt-3">Sign In</h2>
      </div>
      <hr />
      <Form onSubmit={handleSignIn}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className="mb-4"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 btn-lg">
          Sign In
        </Button>
        {/* Will implement google signIn in the next mvp */}
        <Button
          variant="primary"
          type="submit"
          className="googleButton w-100 btn-lg"
        >
          Google
        </Button>
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
