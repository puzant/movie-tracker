import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import movieOverviewActions from 'redux/actions/movieOverviewActions'

import { IMovie, Review, Actor, MovieGenre } from 'api/Models'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import Rating from '@material-ui/lab/Rating'

import MovieReviews from 'components/movieReviews/movieReviews'
import Loader from 'components/loader/loader'
import Constants from 'constants/Constants'
import Cast from 'components/cast/cast'
import Movie from 'components/movie/movie'
import { Block, BlockGroup } from 'components/common/block/block'

import utils from 'utils/utils' 

interface MovieInfoProp {
  text: string 
  value: string
}

export interface MovieOverviewProps {
  fetchMovieById: (movieId: string) => void
  fetchMovieReviews: (movieId: string) => void
  movie: IMovie
  pending: boolean
  movieReviews: Review[]
}

const useStyles = makeStyles((theme) => ({
  iconEmpty: {
    color: theme.palette.grey[500],
  },
}));

const MovieInfo = ({text, value}: MovieInfoProp) => (
  <MovieInfoContainer>
    <MovieInfoText>{text}: </MovieInfoText>
    <span>{value}</span>
  </MovieInfoContainer>
)

const RenderMovieRunTime = ({runtime}: {runtime: number}) => {
  return (
    <MovieInfoContainer>
      <MovieInfoText>Run Time: </MovieInfoText>
      <span>{ `${Math.floor(runtime / 60)}h ${Math.floor(runtime % 60)}m` }</span>
    </MovieInfoContainer>
  )
}

export const MovieOverview = ({
  fetchMovieById,
  fetchMovieReviews,
  movie,
  pending,
  movieReviews
}: MovieOverviewProps) => {

  const classes = useStyles();
  
  const { movieId } = useParams<{ movieId: string }>()
  const MAX_NUMBER_OF_ACTORS: number = 7
  const actors: Actor[] = movie.credits?.cast?.slice(0, MAX_NUMBER_OF_ACTORS) ?? [];
  const randomColor: string = utils.generateRandomColorValue()
  
  useEffect(() => {
    fetchMovieById(movieId)
    fetchMovieReviews(movieId)
  }, [])

  return ( 
    <BlockGroup layout='vertical' justify='center'>

      {!pending && 
        <MovieOverviewContainer backdropPath={movie.backdrop_path}>
      
        <MoviePosterContainer>
          <MoviePoster src={"http://image.tmdb.org/t/p/w342/" + movie.poster_path} alt={movie.poster_path}/>
        </MoviePosterContainer>

        <MovieDescriptionContainer>

          <BlockGroup>

            <MovieInfoContainer>
              <MovieTitle>{movie.title}</MovieTitle>&nbsp;
              <MovieReleaseDate>({movie.release_date})</MovieReleaseDate>
            </MovieInfoContainer>
            
            <Block gap={10}>
              <MovieTagLine>{movie.tagline}</MovieTagLine>
              <MovieInfoContainer>
                <Rating
                  classes={{ iconEmpty: classes.iconEmpty }}
                  style={{marginTop: '5px'}}
                  value={Number(movie.vote_average) / 2}
                  precision={0.5}
                  readOnly
                />
                <Box 
                  component='span' 
                  ml={0.75} 
                  fontWeight="fontWeightMedium" 
                  fontSize="h6.fontSize">
                  {Number(movie.vote_average) / 2}
                </Box>
              </MovieInfoContainer>
              
              <MovieInfo text="Status" value={movie.status} />
              <MovieInfo text="Genres" value={movie?.genres?.map((genre: MovieGenre) => genre.name).join(', ')}></MovieInfo>
              <MovieInfo text="Language" value={utils.getMovieLanguage(movie.original_language)} />
              <RenderMovieRunTime runtime={movie.runtime} />
              <MovieInfo text="About The Movie" value={movie.overview} />
            </Block>

          </BlockGroup>

          <MovieActionsConatiner layout='horizontal' gap={10}>
            <Tooltip title="login to add to your favorite list" aria-label="add">
              <StyledFab color="primary">
                {Constants.MOVIE_OVERVIEW_USER_ACTIONS_ICONS.FAVORITE_MOVIE}
              </StyledFab>
            </Tooltip>

            <Tooltip title="login to add to your watchlist" aria-label="add">
              <StyledFab color="primary">
                {Constants.MOVIE_OVERVIEW_USER_ACTIONS_ICONS.WATCHLIST_MOVIE}
              </StyledFab>
            </Tooltip>

            <Tooltip title="login to add to rate this movie" aria-label="add">
              <StyledFab color="primary">
                {Constants.MOVIE_OVERVIEW_USER_ACTIONS_ICONS.RATE_MOVIE}
              </StyledFab>
            </Tooltip>
          </MovieActionsConatiner>

        </MovieDescriptionContainer>

      </MovieOverviewContainer>}

      <Loader pendingState={pending} />

      {!pending && 
        <BlockGroup>
          <SectionTitle>Top Cast</SectionTitle>
          <Block layout='horizontal' justify='center' wrapped>
            {movie.credits?.cast?.length > 0 && actors.map((actor: Actor) => (
              <Cast key={actor.cast_id} actor={actor} />
            ))}
          </Block>
        </BlockGroup>
      }

      {!pending && <MovieReviews avatarRandomColor={randomColor} reviews={movieReviews} />}

      {!pending && 
        <Block>
          <SectionTitle>Recommendations</SectionTitle>
          <RecommendationsList>
            {movie.recommendations?.results?.map((rm: IMovie) => (
              <StyledLink to={`/movie-overview/${rm.id}`} key={rm.id}>
                <Movie movie={rm} />
              </StyledLink>
            ))}
          </RecommendationsList>
        </Block>
      }

    </BlockGroup>

  );
}


const mapStateToProps = (state: any) => { 
  return {
    movie: state.movie.movie,
    pending: state.movie.pending,
    error: state.movie.error,
    movieReviews: state.movie.movieReviews
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(movieOverviewActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview)

const SectionTitle = styled.div`
  align-self: center;
  font-size: 24px;
  margin: 20px 0 20px 0;
`

const RecommendationsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const MovieTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
`

const MovieReleaseDate = styled.span`
  margin-top: 4px;
  opacity: .8;
`

const MovieTagLine = styled.div`
  font-style: italic;
  margin-top: 3px;
`

const MovieOverviewContainer = styled.div<{
  backdropPath: string
}>`
  display: flex;
  align-items: center;
  padding: 80px;
  background-color: #fff;
  color: #111;
  box-shadow: -2px 4px 30px -1px #000000bf;
  background: ${props => `url(https://image.tmdb.org/t/p/w1280/${props.backdropPath})`};
  background-size: cover;
  background-position: center, center;
  box-shadow: inset 0 0 0 100vw rgb(0 0 0 / 70%);
  color: #fff;
  @media (max-width: 600px) {
    padding: 20px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    color: #fff;
    line-height: 1.6rem;
    margin: auto;
    border-radius: 0px;
  }
`

const MovieInfoContainer = styled.div`
  /* margin-top: 10px; */
`

const MovieInfoText = styled.span`
  color: #a0d2eb;
  font-weight: bold;
`

const MoviePosterContainer = styled.div`
  @media (max-width: 600px) {
    margin: 10px 0 10px 0;
    display: flex;
    justify-content: center;
  }
`

const MoviePoster = styled.img`
  height: 450px;
  width: 300px;
  border-radius: 5px;
  @media (max-width: 600px) {
    height: 280px;
    width: 180px;
  }
`

const MovieDescriptionContainer = styled.div`
  margin-left: 20px;
  line-height: 1.7rem;
  @media (max-width: 600px) {
    text-align: center;
  }
`

const StyledLink = styled(Link)`
  color: #111;
  text-decoration: none;
`

const StyledFab = styled(Fab)`
background-color: #418baf !important;
`

const MovieActionsConatiner = styled(Block)`
  margin-top: 10px;
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
  }
`