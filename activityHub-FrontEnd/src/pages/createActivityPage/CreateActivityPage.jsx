import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./createActivityPage.css";

export default function CreateActivityPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "online",
    link: "",
    address: "",
    time: "",
    date: "",
    image: null,
  });
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
    //  logic to submit activity to the backend
    console.log("Activity created:", formData);
    navigate("/"); // Navigate back to the home page after activity creation
  };

  return (
    <Container className="activity-container">
      <h2>Create Activity</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formActivityTitle">
          <Form.Label>Activity Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter activity title"
            required
          />
        </Form.Group>

        <Form.Group controlId="formActivityDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the activity"
            required
          />
        </Form.Group>

        <Form.Group controlId="formActivityType" className="mt-3">
          <Form.Label>Type of Activity</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="online">Online</option>
            <option value="physical">Physical</option>
          </Form.Control>
        </Form.Group>

        {formData.type === "online" ? (
          <Form.Group controlId="formActivityLink" className="mt-3">
            <Form.Label>Activity Link</Form.Label>
            <Form.Control
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter the online link (e.g., Zoom)"
            />
          </Form.Group>
        ) : (
          <Form.Group controlId="formActivityAddress" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter the physical location address"
            />
          </Form.Group>
        )}

        <Form.Group controlId="formActivityTime" className="mt-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formActivityDate" className="mt-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formActivityImage" className="mt-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Create Activity
        </Button>
      </Form>
    </Container>
  );
}
