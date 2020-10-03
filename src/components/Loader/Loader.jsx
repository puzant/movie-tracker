import React from 'react';
import loader from '../../assets/loader-dotted.gif'

const Loader = (props) => (
  <div className="movie-loader-container">
      {props.pendingState && <img className="movies-loader" src={loader} />}
  </div>
)

export default Loader