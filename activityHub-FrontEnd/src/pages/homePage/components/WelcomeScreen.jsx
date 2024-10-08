import React from "react";
import { Button, Container } from "react-bootstrap";
import activityImage from "../../../assets/activityPoster.png";
import "../HomePageCss.css";
export default function WelcomeScreen() {
  return (
    <Container className="welcomeContainer text-center d-flex align-items-center justify-content-center vh-100">
      <h1>Welcome to ActivityHub</h1>
      <img className="activityImage" src={activityImage} alt="Activity Image" />
      <h5>Please sign in create and join activities.</h5>
      <Button className="mt-4" variant="primary" href="/sign-in">
        Sign In
      </Button>
    </Container>
  );
}
