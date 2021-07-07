import React from "react";
import Table from "./Table";
import './Movies.css';


const Movies = (props) => {
    
    const { movies} = props;
    return (
        <div className="Movies">
            <Table movies={movies}/>
        </div>
    );
}

export default Movies;