import { Container, Row, Col, Card, Button } from "react-bootstrap";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    return <WelcomeScreen />;
  }
  return (
    <Container fluid className="home-container">
      <Row className="mt-4">
        {/* Left Side: Posts (70%) */}
        <Col lg={8} className="posts-column">
          <h2>Latest Posts</h2>

          {/* Example Post */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>John Doe</Card.Title>
              <Card.Text>
                Had a great time in the Yoga class today! Here's a picture from
                the event.
              </Card.Text>
              <img
                src="https://via.placeholder.com/600x300" // Placeholder image for now
                alt="Post"
                className="post-image mb-2"
              />
              <div className="d-flex justify-content-between">
                <Button variant="outline-primary">Like</Button>
                <Button variant="outline-secondary">Comment</Button>
                <Button variant="outline-danger">Delete</Button>
              </div>
            </Card.Body>
          </Card>

          {/* More posts will be dynamically rendered here */}
        </Col>

        {/* Right Side: Activities (30%) */}
        <Col lg={4} className="activities-column">
          <h2>Available Activities</h2>

          {/* Example Activity */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Yoga Class</Card.Title>
              <Card.Text>
                Join a peaceful yoga session at Central Park.
              </Card.Text>
              <Button variant="success">Join</Button>
            </Card.Body>
          </Card>

          {/* More activities will be dynamically rendered here */}
        </Col>
      </Row>
    </Container>
  );
}
