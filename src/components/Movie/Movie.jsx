import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

  const MoviePoster = (props = {}) => {
    const [imageLoaded, setState] = React.useState(false)
    return (
      <div className="movie-poster">
        {
          <img 
            onLoad={() => setState(!imageLoaded)}
            style={!imageLoaded ? {display: 'none'} : {}}
            src={props.poster ? "http://image.tmdb.org/t/p/w185/"  + props.poster 
            : 
            "https://cinemaone.net/images/movie_placeholder.png"} alt=""/>   
        }
        {!imageLoaded && <Skeleton variant="rect" animation="wave" width={185} height={278} />}  
        
      </div>
    )
  }

  const Movie = (props) => {
    return (
        <div className="movie-container">
    
          <MoviePoster poster={props.movie.poster_path} />
    
          <div className="movie-title-rating">
            <div className="movie-title">{props.movie.title}</div>
            <div className="mv-release-date">{props.movie.release_date}</div>
              <div className="movie-rating">
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