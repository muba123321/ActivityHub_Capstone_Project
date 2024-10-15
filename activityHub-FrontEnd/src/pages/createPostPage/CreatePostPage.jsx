// pages/CreatePostPage.jsx
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
  const [formData, setFormData] = useState({ text: "", image: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // logic to submit post to the backend
    console.log("Post created:", formData);
    navigate("/"); // Navigate back to the home page after post creation
  };

  return (
    <Container>
      <h2>Create Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPostText">
          <Form.Label>Post Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="What's on your mind?"
          />
        </Form.Group>

        <Form.Group controlId="formPostImage" className="mt-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Post
        </Button>
      </Form>
    </Container>
  );
}
