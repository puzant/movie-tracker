import React from 'react';

  const MoviePoster = (props = {}) => (
    <div className="movie-poster">
      <img 
        src={props.poster 
          ? 
            "http://image.tmdb.org/t/p/w185/" + props.poster 
          : 
            "https://cinemaone.net/images/movie_placeholder.png"} alt=""/>
    </div>
  )

  const Movie = (props) => {
    return (
        <div className="movie-container">
    
          <MoviePoster poster={props.movie.poster_path} />
    
          <div className="movie-title-rating">
            <div className="movie-title">{props.movie.title}</div>
              <div className="movie-rating">Rating: 
                <span className="rating-value">{props.movie.vote_average}</span>
              </div>
            </div>
    
            <div className="movie-release-date">{props.movie.release_date}</div>      
    
          </div>
    )
  }

export default Movie;