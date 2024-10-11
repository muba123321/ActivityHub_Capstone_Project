import React from "react";
import { Button, Container } from "react-bootstrap";
import activityImage from "../../../assets/activityPoster.png";
import "../HomePageCss.css";
export default function WelcomeScreen() {
  return (
    <Container className="welcomeContainer text-center d-flex align-items-center justify-content-center vh-100">
      <h1>Welcome to ActivityHub</h1>
      <h5>Click the image to Sign in and enjoy the fun!!.</h5>
      <a href="/sign-in">
        <img
          className="activityImage"
          src={activityImage}
          alt="Activity Image"
        />
      </a>
    </Container>
  );
}
