import { useEffect, useState } from 'react';
import './App.css';
import Movies from './component/Movies';
import Rate from "./component/Rating";
import SelectedMovies from './component/SelectedMovies';
import { Container, Row, Col } from 'react-bootstrap';
import Recommendations from './component/Recommendations';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

function App() {
  const [appState, setAppState] = useState({
      movies: null,
  });

  const [moviesSelectedState, setMoviesSelectedState] = useState({
    selectedMovies: new Set(),
  })

  const [recommendationsState, setRecommendationsState] = useState({
    loadingRecommendations: false,
    recommendations: null
  })

  const [modalState, setModalState] = useState(false);
  const handleModalClose = () => setModalState(false);
  const handleModalShow = () => setModalState(true);

  useEffect(() => {
      const apiUrl = 'https://35.198.67.129/movies'
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

  const computeRecommendations = () => {
    const selected = moviesSelectedState.selectedMovies;

    if (selected.size === 0) {
      alert("Rate movies to get recommendations.");
      return;
    }

    var ratings = [];
    selected.forEach((value) => ratings.push(parseInt(localStorage.getItem("movie-" + value))))
    handleModalShow();

    setRecommendationsState({ loadingRecommendations: true, recommendations: false })

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movies: Array.from(selected), ratings: ratings })
    };
    fetch('https://35.198.67.129/recommendation', requestOptions)
      .then(response => response.json())
      .then(data => setRecommendationsState({ loadingRecommendations: false, recommendations: data }));

  }

  return (
    <div className="App">
        <div className="Header">
          <h3>Old is gold. Discover the best movies until the 2000s</h3>
        </div>
        <Container fluid>
          <Row>
            <Col xs={8}><Movies movies={appState.movies} /></Col>
            <Col>
              <div>
                <SelectedMovies className="selected-movies" recommended={recommendationsState.recommendations}
                          movies={appState.movies} selected={moviesSelectedState.selectedMovies} />
                <Container>
                  <div className="recommendations-container">
                    <h5>Recommendations</h5>
                  </div>
                  {
                    !recommendationsState.loadingRecommendations && !recommendationsState.recommendations
                    ? <Button variant="outline-success" onClick={computeRecommendations}>Compute Recommendations</Button>
                    : <Recommendations loading={recommendationsState.loadingRecommendations} recommendations={recommendationsState.recommendations}/>
                  }
                </Container>                
              </div>
            </Col>
          </Row>
        </Container>
        <Modal className="modal-text-color" show={modalState} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Computing Recommendations With The Following Rated Movies:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {Array.from(moviesSelectedState.selectedMovies).map(
                (index) => (
                  <ListGroup.Item key={index}>{appState.movies[index].title} with rating <span>
                      {localStorage.getItem("movie-" + index)}.
                    </span></ListGroup.Item>
                )
              )}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default App;


// curl -d '{"movies": ["0", "10", "21", "26", "55", "63", "68"], "ratings":[4.0, 4.0, 4.0, 4.0, 5.0, 5.0, 5.0]}'
//  -H "Content-Type: application/json" -X POST http://localhost:8080/recommendation
