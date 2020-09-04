import React from 'react'

const MoviesError = (props) => (
  props.error &&
  <div className="movies-error">
    <div className="error-text">There was error while fetching the movies</div>
  </div> 
)

export default MoviesError