import React from "react";
import MaterialTable from "material-table";

const Table = (props) => {
    const { movies } = props;

    if (!movies || movies.length ===0) return <p>Retrieving movies</p>;

    return (
        <div>
            <MaterialTable
                title="Movies available"
                columns={[
                    { title: 'Title', field: 'title'},
                    { title: 'Release Date', field: 'release_date'},
                    { title: 'Genres', field: 'all_genres'},
                    { title: 'Rating', field: 'rating'},
                ]}
                data={movies}
                options={{
                    pageSize: 10
                }}
            />
        </div>
    );
}

export default Table;