import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import styled from 'styled-components'

const MoviePoster = (props = {}) => {

  const [imageLoaded, setImageLoadedState] = React.useState(false)

    return (
      <MoviePosterContainer>
        {
          <MoviePosterImage
            imageLoaded={imageLoaded}
            onLoad={() => setImageLoadedState(!imageLoaded)}
            src={props.poster ? "http://image.tmdb.org/t/p/w185/" + props.poster
            : 
            "https://cinemaone.net/images/movie_placeholder.png"} alt=""/>
        }
        
        {!imageLoaded && <Skeleton variant="rect" animation="wave" width={185} height={278} />}
      </MoviePosterContainer>
    )
  }

const Movie = (props) => {
  return (
    <MovieContainer>
    
      <MoviePoster poster={props.movie.poster_path} />
    
      <MovieTitleRatingContainer>
      
        <MovieTitle title={props.movie.title}>{props.movie.title}</MovieTitle>
        <MovieReleaseDate>{props.movie.release_date}</MovieReleaseDate>

        <MovieRating>
          {props.movie.vote_count &&
            <Box display='flex' alignItems='center'>
              <Rating
                style={{marginTop: '5px'}}
                value={props.movie.vote_average / 2}
                precision={0.5}
                readOnly
              />
              <Box 
                component='span' 
                ml={0.75} 
                fontWeight="fontWeightMedium" 
                fontSize="h6.fontSize">
                  {props.movie.vote_average / 2}
              </Box>
            </Box>
          }
        </MovieRating>
      </MovieTitleRatingContainer>
    
    
    </MovieContainer>
  )
}

export default Movie;

const MoviePosterContainer = styled.div``

const MoviePosterImage = styled.img`
  display: ${props => !props.imageLoaded ? 'none' : 'inline'};
`

const MovieContainer = styled.div`
  background: #fff;
  box-shadow: -2px 4px 30px -1px #000000;
  transform-origin: top left;
  border-radius: 5px;
  margin: 15px;
  width: auto;
  padding: 13px;
  height: 375px;
  transition: .5s;
  &:hover {
    cursor: pointer;
    background-color: #ebe7e7;
  }
`

const MovieTitle = styled.div`
  margin-top: 4px;
  font-weight: bold;
  width: 160px; 
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
`

const MovieReleaseDate = styled.div`
  font-weight: bold;
  margin-top: 10px;
`

const MovieTitleRatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;
`

const MovieRating = styled.div`
  margin-top: 4px;
  font-weight: bold;
`