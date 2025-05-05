import React, { useEffect } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, Row, Col, Image, Container, Table } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const loading = useSelector((state) => state.movie.loading);
  const error = useSelector((state) => state.movie.error);

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedMovie) return <p>No movie found.</p>;

  return (
    <Container className="mt-4">
      <Card className="bg-light shadow-sm p-3 rounded">
        <Row>
          <Col md={4}>
            {selectedMovie.imageURL ? (
              <Image src={selectedMovie.imageURL} alt="Movie Poster" fluid rounded />
            ) : (
              <p>No image available</p>
            )}
          </Col>
          <Col md={8}>
            <h2>{selectedMovie.title}</h2>
            <p><strong>Genre:</strong> {selectedMovie.genre}</p>
            <p><strong>Release Year:</strong> {selectedMovie.releaseDate}</p>
            <h5 className="d-flex align-items-center">
              <BsStarFill className="text-warning me-2" />
              {selectedMovie.avgRating ? selectedMovie.avgRating.toFixed(1) : 'No rating yet'}
            </h5>
            <hr />
            <h5>Actors</h5>
            <ListGroup variant="flush">
              {selectedMovie.actors.map((actor) => (
                <ListGroup.Item key={actor._id}>
                  <strong>{actor.actorName}</strong> as <em>{actor.characterName}</em>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>

        <hr />

        <h4 className="mt-4">Reviews</h4>
        {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Rating</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {selectedMovie.reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.username}</td>
                  <td>
                    <BsStarFill className="text-warning" /> {review.rating}
                  </td>
                  <td>{review.review}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No reviews yet.</p>
        )}
      </Card>
    </Container>
  );
};

export default MovieDetail;
