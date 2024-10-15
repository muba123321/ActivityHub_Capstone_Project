import React from "react";
import { Col, Card, Button } from "react-bootstrap";
export default function AcitivityScreen() {
  return (
    <Col lg={7} className="activities-column">
      <h3>Available Activities</h3>

      {/* Example Activity */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Yoga Class</Card.Title>
          <Card.Text>Join a peaceful yoga session at Central Park.</Card.Text>
          <Button variant="success">Join</Button>
        </Card.Body>
      </Card>

      {/* More activities will be dynamically rendered here */}
    </Col>
  );
}
