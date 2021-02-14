import React from 'react';
import loader from '../../assets/loader-dotted.gif'

const Loader = ({pendingState}) => (
  <div className="movie-loader-container">
      {pendingState && <img className="movies-loader" alt="loading icon" src={loader} />}
  </div>
)

export default Loader