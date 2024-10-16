import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Pagination, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./activityScreen.css";
import { auth } from "../../../firebase";

export default function ActivityScreen() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // Define how many activities per page

  const { currentUser } = useSelector((state) => state.user);

  // Fetch activities from the backend
  const fetchActivities = async (page) => {
    setLoading(true);

    try {
      console.log(currentUser);
      const idToken = await auth.currentUser.getIdToken();
      console.log(idToken);

      const response = await fetch(
        `/api/activities?page=${page}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setActivities(data.activities);
        setTotalPages(data.totalPages);
      } else {
        setError(data.message || "Failed to fetch activities.");
      }
    } catch (err) {
      setError("An error occurred while fetching activities.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(currentPage);
    console.log(currentPage);
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Spinner animation="border" variant="primary" />;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <h3 className="mb-4">Available Activities</h3>

      {activities.map((activity) => (
        <Card className="mb-3" key={activity._id}>
          <Carousel className="activity-carousel">
            {activity.imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url}
                  alt={`Activity Image ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <Card.Body>
            <Card.Title>{activity.title}</Card.Title>
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
