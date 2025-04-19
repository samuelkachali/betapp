import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const handleMovieSelect = (movie) => {
    if (!selectedMovies.includes(movie)) {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/recommend', {
        movies: selectedMovies,
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Movie Recommender</h1>
      <div>
        <h3>Select Movies You Like:</h3>
        <button onClick={() => handleMovieSelect('Inception')}>Inception</button>
        <button onClick={() => handleMovieSelect('The Matrix')}>The Matrix</button>
        <button onClick={() => handleMovieSelect('Avatar')}>Avatar</button>
        <button onClick={() => handleMovieSelect('Interstellar')}>Interstellar</button>
      </div>
      <div>
        <h3>Selected Movies:</h3>
        <ul>
          {selectedMovies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit}>Get Recommendations</button>
      <div>
        <h3>Recommended Movies:</h3>
        <ul>
          {recommendations.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;