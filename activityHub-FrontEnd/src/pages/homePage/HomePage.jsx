import { Container, Row } from "react-bootstrap";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import { FaPlusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostScreen from "./components/PostScreen.jsx";
import AcitivityScreen from "./components/AcitivityScreen.jsx";

export default function HomePage() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!currentUser) {
    return <WelcomeScreen />;
  }
  return (
    <Container fluid className="home-container">
      <Row className="mt-4">
        {/* Left Side: Posts (60%) */}
        <PostScreen />

        {/* Right Side: Activities (40%) */}
        <AcitivityScreen />
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
