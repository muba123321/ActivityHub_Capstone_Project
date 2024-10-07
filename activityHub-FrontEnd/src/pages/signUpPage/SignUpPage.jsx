import { Form, Button, Container } from "react-bootstrap";
import logo from "../../assets/logo.png";

export default function SignUpPage() {
  return (
    <Container
      style={{
        maxWidth: "600px",
        marginTop: "100px",
        padding: "40px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        boxShadow: "10px 10px 5px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
      }}
    >
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <h2 className="mt-3" style={{ fontWeight: "bold" }}>
          Sign Up
        </h2>
      </div>
      <hr
        style={{ border: "1px solid #007bff", width: "80px", margin: "0 auto" }}
      />
      <Form>
        <Form.Group controlId="formFullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            className="mb-3"
          />
        </Form.Group>

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
            className="mb-3"
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            className="mb-4"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 btn-lg">
          Sign Up
        </Button>

        <div className="mt-3 text-center">
          <span>
            Already have an account?{" "}
            <a href="/sign-in" style={{ color: "#007bff" }}>
              Sign In
            </a>
          </span>
        </div>
      </Form>
    </Container>
  );
}
