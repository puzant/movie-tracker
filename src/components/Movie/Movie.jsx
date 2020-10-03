import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

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
              <div className="movie-rating">
                <div className="movie-release-date">{props.movie.release_date}</div>      
                {props.movie.vote_count &&
                  <Box display='flex' alignItems='center'>
                    <Rating
                      style={{marginTop: '5px'}}
                      value={props.movie.vote_average / 2}
                      precision={0.5}
                      readOnly
                    />
                    <Box component='span' ml={0.75} fontWeight="fontWeightMedium" fontSize="h6.fontSize">
                      {props.movie.vote_average / 2}
                    </Box>
                  </Box>
                }
              </div>
            </div>
    
    
          </div>
    )
  }

export default Movie;