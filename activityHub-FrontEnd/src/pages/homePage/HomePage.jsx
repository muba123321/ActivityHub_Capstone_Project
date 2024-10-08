import { Container, Row, Col, Card, Button } from "react-bootstrap";
import WelcomeScreen from "./components/WelcomeScreen.jsx";

export default function HomePage({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <WelcomeScreen />;
  }
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Available Activities</h2>

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
