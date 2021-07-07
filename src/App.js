import { useEffect, useState } from 'react';
import './App.css';
import Movies from './component/Movies';
import Rate from "./component/Rating";
import SelectedMovies from './component/SelectedMovies';

function App() {
  const [appState, setAppState] = useState({
      movies: null
  });

  const [moviesSelectedState, setMoviesSelectedState] = useState({
    selectedMovies: new Set(),
  })

  useEffect(() => {
      const apiUrl = 'http://127.0.0.1:8080/movies'
      fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
              data = data.map((movie, index) => {
                  return {
                      title : movie.title,
                      release_date : movie.release_date,
                      all_genres : movie.all_genres,
                      rating : <Rate val={0} index={index} movies={moviesSelectedState} setMovie={setMoviesSelectedState} />
                  };
              });
              setAppState({ movies: data});
          });
          // eslint-disable-next-line
  }, [setAppState]);

  return (
    <div className="App">
        <div className="Header">
          <h3>Old is gold. Discover the best movies until the 2000s</h3>
        </div>
        <Movies movies={appState.movies} />
        <SelectedMovies movies={appState.movies} selected={moviesSelectedState.selectedMovies} />
    </div>
  );
}

export default App;
