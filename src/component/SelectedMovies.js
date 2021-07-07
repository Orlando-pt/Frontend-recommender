import React from "react";
import MaterialTable from "material-table";
import Rate from "./Rating";
import "./Movies.css";
import { Button } from "react-bootstrap";

const SelectedMovies = (props) => {
    const { movies, selected, recommended } = props;

    if (!movies) return <p>Retrieving Movies</p>;

    const selectedMovies = movies.filter((movie, index) => selected.has(index));

    if (selectedMovies.length ===0) return (
        <div>
            <p className="selected-text">Hello There <span>&#128521;</span></p>
            <p>To get recommendations, rate some movies (the more the better) and when you're done click the pretty button below.</p>
            <p>Use the search option at the top right of the table to rate your favorite movies faster.</p>
            <p style={{
                marginTop: "3%"
            }}>[At the moment, the table pagination isn't working. You must think about your favourite 
            movies, search them and finally proceed to their rating. Sorry <span>&#x1F61F;</span> ]</p>
        </div>
    );

    const reloadPage = () => window.location.reload(false);
    if (recommended && recommended.length > 0) return (
        <div>
            <p>Do you want to try again with different movies?</p>
            <p>Then click below</p>
            <Button variant="outline-success" onClick={reloadPage}>Let's Do It Again!</Button>
        </div>
    )

    const data = selectedMovies.map((movie) => {
        const movieRating = movie.rating;
        return {
            title : movie.title,
            rating : <Rate 
                        val={parseInt(localStorage.getItem("movie-" + movieRating.props.index))}
                        index={movieRating.props.index}
                        movies={movieRating.props.movies}
                        setMovie={movieRating.props.setMovie}
                    />,
        };
    });
    return (
        <div>
            <MaterialTable
                title="Rated movies"
                columns={[
                    { title: 'Title', field: 'title'},
                    { title: 'Rating', field: 'rating'},
                ]}
                data={data}
                options={
                    { 
                        paginationType : "stepped",
                        pageSize : 5,
                        maxBodyHeight : "30vh"
                    }
                }
            />
        </div>
    );
}

export default SelectedMovies;