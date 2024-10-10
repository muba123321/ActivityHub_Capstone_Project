import { Container, Row, Col, Card, Button } from "react-bootstrap";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
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
