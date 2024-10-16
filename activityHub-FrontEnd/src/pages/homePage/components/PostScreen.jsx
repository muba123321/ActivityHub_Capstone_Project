import React from "react";
import { Card, Button } from "react-bootstrap";

export default function PostScreen() {
  return (
    <>
      <h3>Latest Posts</h3>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>John Doe</Card.Title>
          <Card.Text>
            Had a great time in the Yoga class today! Here's a picture from the
            event.
          </Card.Text>
          <img
            src="https://via.placeholder.com/600x300"
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
    </>
  );
}
