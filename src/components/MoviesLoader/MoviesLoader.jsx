import React from 'react';
import loader from '../../assets/loader-dotted.gif'

const MoviesLoader = (props) => (
  <div className="movie-loader-container">
      {props.pendingState && <img className="movies-loader" src={loader} />}
  </div>
)

export default MoviesLoader