import React, { useEffect, useState } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Form, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading);
  const error = useSelector(state => state.movie.error);

  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `/movies/${movieId}/reviews`,
        { rating, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating(1);
      setReview("");
      dispatch(fetchMovie(movieId)); // Refresh movie data
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const DetailInfo = () => {
    if (loading) return <div>Loading....</div>;
    if (error) return <div>Error: {error}</div>;
    if (!selectedMovie) return <div>No movie data available.</div>;

    return (
      <Card className="bg-dark text-dark p-4 rounded">
        <Card.Header>Movie Detail</Card.Header>
        <Card.Body>
          <Image className="image" src={selectedMovie.imageUrl} thumbnail />
        </Card.Body>
        <ListGroup>
          <ListGroupItem>{selectedMovie.title}</ListGroupItem>
          <ListGroupItem>
            {selectedMovie.actors.map((actor, i) => (
              <p key={i}>
                <b>{actor.actorName}</b> {actor.characterName}
              </p>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              <BsStarFill /> {selectedMovie.avgRating || "N/A"}
            </h4>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <h5>Reviews</h5>
          {selectedMovie.reviews.length > 0 ? (
            selectedMovie.reviews.map((review, i) => (
              <p key={i}>
                <b>{review.username}</b> {review.review} <BsStarFill /> {review.rating}
              </p>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

          <hr />
          <h5>Leave a Review</h5>
          <Form onSubmit={handleReviewSubmit}>
            <Form.Group controlId="reviewText">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="ratingSelect">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                required
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  };

  return <DetailInfo />;
};

export default MovieDetail;
