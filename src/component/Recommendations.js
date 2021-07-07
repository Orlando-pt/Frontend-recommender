import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Spinner from "react-activity/dist/Spinner";

import "./Movies.css";

const useStyles = makeStyles({
    table: {
      minWidth: 100,
    },
  });

const Recommendations = (props) => {
    const classes = useStyles();

    const { loading, recommendations} = props;

    if (loading) {
        return (
            <div className="loading-parent-div">
                <div className="loading-div-align-center">
                    <Spinner
                        size={30}
                        speed={0.5}
                        color="green"
                        />
                </div>
                <div className="loading-text">
                    <p>Well done! Now you just need to wait a minute, more or less.</p>
                    <p>Yes... it takes a bit but we are computing the ratings of 950 people to give you the best possible recommendations.</p>
                    <p>Please be patient, and maybe drink a cup of <span>&#9749;</span> <span>&#128521;</span>.</p>
                </div>
            </div>
        );
    }

    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Cosine Score</TableCell>
                <TableCell align="right">Genres</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recommendations.map((movie) => (
                <TableRow key={movie.movie_id}>
                  <TableCell component="th" scope="row">
                    {movie.titles}
                  </TableCell>
                  <TableCell align="right">{movie.cosine_score}</TableCell>
                  <TableCell align="right">{movie.genres}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

}

export default Recommendations;