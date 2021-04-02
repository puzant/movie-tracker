// TODO: Refactor to functional component
import React from 'react'
import { Link } from "react-router-dom"
import { bindActionCreators } from 'redux'
import movieOverviewActions from '../../redux/actions/movieOverviewActions'
import { connect } from 'react-redux'
import MovieReviews from '../movieReviews/movieReviews'
import Loader from '../loader/loader'
import Constants from '../../constants/Constants'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import Cast from '../cast/cast'
import Movie from '../movie/movie'
import styled from 'styled-components'
import { Block, BlockGroup } from '../layout/block/block'
import utils from '../../utils/utils' 

class MovieOverview extends React.Component {

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.fetchMovieById(params.movieId)
    this.props.fetchMovieReviews(params.movieId)
  }

  movieLanguage() {
    switch(this.props.movie?.original_language) {
      case Constants.MOVIE_LANGUAGE_CODE.ENGLISH:
        return 'English'
      case Constants.MOVIE_LANGUAGE_CODE.FRENCH:
        return 'French'
      case Constants.MOVIE_LANGUAGE_CODE.JAPANESE:
        return 'japanese'
      case Constants.MOVIE_LANGUAGE_CODE.KOREAN:
        return 'korean'
      default:
        return 'English'
    }
  }

  render() { 

    const { movie, pending, movieReviews } = this.props
    const MAX_NUMBER_OF_ACTORS = 7
    const actors = movie.credits?.cast?.slice(0, MAX_NUMBER_OF_ACTORS) ?? [];
    const randomColor = utils.generateRandomColorValue()

    const MovieInfo = ({text, value}) => (
      <MovieInfoContainer>
        <MovieInfoText>{text}: </MovieInfoText>
        <span>{value}</span>
      </MovieInfoContainer>
    )

    const RenderMovieRunTime = () => 
      movie.runtime ? (
        <Block layout='horizontal' marginTop='10'>
          <MovieInfoText>Run Time: </MovieInfoText>
          <span>{ `${Math.floor(movie.runtime / 60)}h ${Math.floor(movie.runtime % 60)}m` }</span>
        </Block>
      ) :
      null

    return ( 
      <BlockGroup layout='vertical' justify='center'>

        {!pending && 
          <MovieOverviewContainer backdropPath={movie.backdrop_path}>
        
          <MoviePosterContainer>
            <MoviePoster src={"http://image.tmdb.org/t/p/w342/" + movie.poster_path} alt={movie.poster_path}/>
          </MoviePosterContainer>

          <MovieDescriptionContainer>

            <BlockGroup>

              <Block layout='horizontal'>
                <MovieTitle>{movie.title}</MovieTitle>&nbsp;
                <MovieReleaseDate>({movie.release_date})</MovieReleaseDate>
              </Block>

              <MovieTagLine>{movie.tagline}</MovieTagLine>
              <MovieInfo text="Rating" value={movie.vote_average} />
              <MovieInfo text="Status" value={movie.status} />
              <MovieInfo text="Genres" value={movie?.genres?.map((genre) => genre.name).join(', ')}></MovieInfo>
              <MovieInfo text="Language" value={this.movieLanguage()} />
              <RenderMovieRunTime />
              <MovieInfo text="About The Movie" value={movie.overview} />

            </BlockGroup>

            <Block layout='horizontal' gap={10} marginTop={10}>
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
            </Block>

          </MovieDescriptionContainer>
  
        </MovieOverviewContainer>}

        <Loader pendingState={pending} />

        {!pending && 
          <BlockGroup>
            <SectionTitle>Top Cast</SectionTitle>
            <Block layout='horizontal' justify='center' wrap>
              {movie.credits?.cast?.length > 0 && actors.map((actor) => (
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
              {movie.recommendations?.results?.map((rm) => (
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
}

const mapStateToProps = (state) => { 
  return {
    movie: state.movie.movie,
    pending: state.movie.pending,
    movieReviews: state.movie.movieReviews
  }
}

const mapDispatchToProps = (dispatch) => {
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

const MovieOverviewContainer = styled.div`
  display: flex;
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
  margin-top: 10px;
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