import React, { useEffect, useState } from "react";

import {
  Card,
  Button,
  Spinner,
  Pagination,
  Carousel,
  // OverlayTrigger,
  // Tooltip,
  Toast,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import "./activityScreen.css";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../utils/IconWrapper";

export default function ActivityScreen() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const itemsPerPage = 5;

  const token = useSelector((state) => state.user.idToken);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  // Fetch activities from the backend
  const fetchActivities = async (page) => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/activities?page=${page}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setActivities(data.activities);
        setTotalPages(data.totalPages);
      } else {
        setError(data.message || "Failed to fetch activities.");
        setShowToast(true);
      }
    } catch (err) {
      setError("An error occurred while fetching activities.");
      setShowToast(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(currentPage);
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle delete activity
  const handleDeleteActivity = async (activityId) => {
    try {
      const response = await fetch(`/api/activities/${activityId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the deleted activity from the state
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity._id !== activityId)
        );
        setSuccess("Activity successfully deleted.");
        setShowToast(true);
      } else {
        setError(data.message || "Failed to delete activity.");
        setShowToast(true);
      }
    } catch (err) {
      setError("An error occurred while deleting the activity.");
      setShowToast(true);
      console.log(err);
    }
  };

  if (loading)
    return (
      <div className="col-md-6 text-center">
        <Spinner animation="grow" size="sm" variant="primary" />
        <Spinner animation="grow" variant="primary" />
      </div>
    );

  // if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <h3 className="mb-4">Available Activities</h3>
      {/* Toast for displaying messages */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">
            {error ? "Error" : success ? "Success" : ""}
          </strong>
        </Toast.Header>
        <Toast.Body>{error || success}</Toast.Body>
      </Toast>

      {activities.map((activity) => (
        <Card className="mb-3 activity-card" key={activity._id}>
          <Carousel className="activity-carousel">
            {activity.imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className=" d-block w-100"
                  src={url}
                  alt={`Activity Image ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Body>
            <Card.Title>
              {/* {activity.title} */}
              {activity.title}
              {/* Show icons for the activity creator */}
              {currentUser && activity.createdBy._id === currentUser._id && (
                <div className="activity-icons">
                  {/* <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit Activity</Tooltip>}
                  > */}
                  <EditIcon
                    className="edit-icon"
                    onClick={() => navigate("/edit-activity")}
                  />
                  {/* </OverlayTrigger> */}

                  {/* <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete Activity</Tooltip>}
                  > */}
                  <DeleteIcon
                    className="delete-icon"
                    onClick={() => handleDeleteActivity(activity._id)}
                  />
                  {/* </OverlayTrigger> */}
                </div>
              )}
            </Card.Title>
            <Card.Text>{activity.description}</Card.Text>
            <Button variant="success">Join</Button>
          </Card.Body>
        </Card>
      ))}

      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages).keys()].map((num) => (
          <Pagination.Item
            key={num + 1}
            active={num + 1 === currentPage}
            onClick={() => handlePageChange(num + 1)}
          >
            {num + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
}
