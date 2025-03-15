import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import SignUp from './components/signup'; // New component for signup
import SignIn from './components/signin'; // New component for signin
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <MovieHeader />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/signup" element={<SignUp />} />  {/* New Signup route */}
          <Route path="/signin" element={<SignIn />} />  {/* New Signin route */}
          {/* Add other routes if needed */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

