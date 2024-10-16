import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import { FaPlusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostScreen from "./components/PostScreen.jsx";
import AcitivityScreen from "./components/AcitivityScreen.jsx";
import { useState } from "react";

export default function HomePage() {
  const { currentUser } = useSelector((state) => state.user);
  const [showActivity, setShowActivity] = useState(true);
  const navigate = useNavigate();

  if (!currentUser) {
    return <WelcomeScreen />;
  }
  return (
    <Container fluid className="home-container">
      {/* Screen size check */}
      <div className="d-block d-lg-none text-end mb-3">
        {/* Buttons for small screens to toggle between Activity and Post */}
        <ButtonGroup>
          <Button
            variant={showActivity ? "primary" : "outline-primary"}
            onClick={() => setShowActivity(true)}
          >
            Activities
          </Button>
          <Button
            variant={!showActivity ? "primary" : "outline-primary"}
            onClick={() => setShowActivity(false)}
          >
            Posts
          </Button>
        </ButtonGroup>
      </div>

      <Row className="mt-4">
        {/* Left Side: Posts (60%) */}
        <Col lg={7} className="activities-column d-none d-lg-block">
          <AcitivityScreen />
        </Col>

        {/* Right Side: Activities (40%) */}
        <Col lg={5} className="posts-column d-none d-lg-block">
          <PostScreen />
        </Col>

        {/* Small screen: Toggle between Activity and Post Screens */}
        <Col xs={12} className="d-block d-lg-none">
          {showActivity ? <AcitivityScreen /> : <PostScreen />}
        </Col>
      </Row>
      <div className="floating-icons">
        <FaPlusCircle
          className="create-activity-icon"
          size={50}
          onClick={() => navigate("/create-activity")} // Navigate to create activity page
          title="Create Activity"
        />
        <FaPlusCircle
          className="create-post-icon"
          size={50}
          onClick={() => navigate("/create-post")} // Navigate to create post page
          title="Create Post"
        />
      </div>
    </Container>
  );
}
