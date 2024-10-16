import { useState } from "react";
import { auth } from "../../firebase";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  ProgressBar,
} from "react-bootstrap";
import { FaRegClosedCaptioning, FaTimesCircle } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
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
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      handleImageUpload(files);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle image uploads with preview
  const handleImageUpload = (files) => {
    const newImages = Array.from(files).slice(0, 6 - formData.images.length); // Limit to 6 images

    if (newImages.length + formData.images.length > 6) {
      setError("You can only upload a maximum of 6 images.");
      return;
    }

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  // Handle image removal from preview
  const handleImageRemove = (index) => {
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    const updatedImages = formData.images.filter((_, i) => i !== index);

    setPreviewImages(updatedPreviews);
    setFormData((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const uploadImagesToFirebase = async (images) => {
    const uploadPromises = images.map((image) => {
      const storageRef = ref(storage, `activities/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    return Promise.all(uploadPromises);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const idToken = await auth.currentUser.getIdToken();
      const imageUrls = await uploadImagesToFirebase(formData.images);
      const activityData = { ...formData, imageUrls };

      // Send activity data to backend
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(activityData),
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Activity created:", result);
        navigate("/"); // Redirect to home after creation
        setLoading(false);
      } else {
        setError(result.message);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error uploading images:", err);
      setError("Failed to create activity. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Container className="activity-container mt-4">
      <h2 className="text-center mb-4">Create Activity</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {uploadProgress > 0 && (
        <ProgressBar
          now={uploadProgress}
          label={`${Math.round(uploadProgress)}%`}
        />
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formActivityTitle" className="mb-3">
              <Form.Label>Activity Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter activity title"
                disabled={loading}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formActivityType" className="mb-3">
              <Form.Label>Type of Activity</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                disabled={loading}
                onChange={handleChange}
              >
                <option value="online">Online</option>
                <option value="physical">Physical</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formActivityTime" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                disabled={loading}
                value={formData.time}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formActivityDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formActivityDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            placeholder="Describe the activity"
            required
          />
        </Form.Group>

        {formData.type === "online" && (
          <Form.Group controlId="formActivityLink" className="mb-3">
            <Form.Label>Activity Link</Form.Label>
            <Form.Control
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter the online link (e.g., Zoom)"
            />
          </Form.Group>
        )}

        {formData.type === "physical" && (
          <Form.Group controlId="formActivityAddress" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter the physical location address"
            />
          </Form.Group>
        )}

        <Form.Group controlId="formActivityImages" className="mb-3">
          <Form.Label>
            Upload Images (Max 6):
            <span className="text-muted"> First image will be the cover</span>
          </Form.Label>
          <Form.Control
            type="file"
            name="images"
            disabled={loading}
            multiple
            onChange={handleChange}
            accept="image/*"
          />
        </Form.Group>

        <div className="image-previews mb-3">
          {previewImages.map((src, index) => (
            <div key={index} className="preview-image-container">
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className="preview-image"
              />
              <FaTimesCircle
                className="cancel-icon"
                onClick={() => handleImageRemove(index)}
              />
            </div>
          ))}
        </div>

        <Button
          disabled={loading}
          variant="primary"
          type="submit"
          className="w-100"
        >
          {loading ? "Loading..." : "Create Activity"}
        </Button>
      </Form>
    </Container>
  );
}
