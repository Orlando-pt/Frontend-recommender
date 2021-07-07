import React from "react";
import MaterialTable from "material-table";
import Rate from "./Rating";

const SelectedMovies = (props) => {
    const { movies, selected } = props;

    if (!movies) return <p>Retrieving Movies</p>;

    const selectedMovies = movies.filter((movie, index) => selected.has(index));

    if (selectedMovies.length ===0) return <p>Rate Movies. They will appear here ;)</p>;

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
                options={{
                    pageSize: 5
                }}
            />
        </div>
    );
}

export default SelectedMovies;