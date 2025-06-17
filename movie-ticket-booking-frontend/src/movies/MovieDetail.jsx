import React from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
     
  return (
    <div>
      <h2>Movie Detail - ID: {id}</h2>
      <p>This is a description of movie ID {id}.</p>
    </div>
  );
};

export default MovieDetail;
