import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token'); // Ensure JWT is stored

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(
        'http://localhost:3001/search',
        { query }, // Change to the appropriate key if your backend expects a different one
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMovies(res.data); // Assuming the response is an array of movie objects
    } catch (err) {
      console.error(err);
      setError('Search failed or unauthorized.');
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center">Search Movies</h2>
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search by title or actor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Search
        </Button>
      </Form>

      {error && <p className="text-danger">{error}</p>}

      <Row>
        {movies.map((movie) => (
          <Col key={movie._id} md={4} className="mb-4">
            <Card className="h-100">
              {movie.imageUrl && (
                <Card.Img
                  variant="top"
                  src={movie.imageURL}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Genre: {movie.genre}</Card.Text>
                <Card.Text>Release Year: {movie.releaseDate}</Card.Text>
                <Link to={`/movies/${movie._id}`} className="btn btn-outline-primary">
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieSearch;
