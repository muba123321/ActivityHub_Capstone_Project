import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import profileImage from "../assets/activityPoster.png";
export default function HomePage({ isAuthenticated }) {
  if (!isAuthenticated) {
    return (
      <Container className="text-center" style={{ marginTop: "50px" }}>
        <h1>Welcome to ActivityHub</h1>
        <p>Please sign in to see the activities.</p>
        <Button variant="primary" href="/sign-in">
          Sign In
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Available Activities</h2>
          {/* Example activity card, you can populate these dynamically */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Yoga Class</Card.Title>
              <Card.Text>
                Join a peaceful yoga session at Central Park.
              </Card.Text>
              <Button variant="success">Join</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
