import React from "react";
import ReactStars from "react-rating-stars-component";

const Rate = (props) => {
    const { val } = props;

    const [value, setValue] = React.useState(
        val ? val : 0
    );

    const { index, movies, setMovie } = props;
    
    const handleChange = (value) => {
        setValue(value);

        localStorage.setItem("movie-" + index, value);

        setMovie({selectedMovies : movies.selectedMovies.add(index)});
      };


    return <ReactStars
            count={5}
            value={value}
            onChange={handleChange}
            size={24}
            activeColor="#ffd700"
        />    
}

export default Rate;