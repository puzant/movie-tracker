import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {bindActionCreators} from 'redux'
import movieOverviewActions from '../../redux/actions/movieOverviewActions'
import {connect} from 'react-redux'
import MovieReviews from '../movieReviews/movieReviews'
import Loader from '../Loader/Loader'
import Constants from '../../constants/Constants'
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Cast from '../cast/cast'
import Movie from '../Movie/Movie'
import styled from 'styled-components'

const MovieInfoContainer = styled.div`
  margin-top: 10px;
`

const MovieInfoText = styled.span`
  color: #a0d2eb;
  font-weight: bold;
`
class MovieOverview extends Component {

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.fetchMovieById(params.movieId)
    this.props.fetchMovieReviews(params.movieId)
  }

  movieLanguage() {
    switch(this.props.movie?.original_language) {
      case Constants.MOVIE_LANGUAGE_CODE.ENGLISH:
        return "English"
      case Constants.MOVIE_LANGUAGE_CODE.FRENCH:
        return "French"
      case Constants.MOVIE_LANGUAGE_CODE.JAPANESE:
        return "japanese"
      case Constants.MOVIE_LANGUAGE_CODE.KOREAN:
        return "korean"
      default:
        return "English"
    }
  }

  render() { 

    let { movie, moviePending, movieReviews } = this.props

    const MAX_NUMBER_OF_ACTORS = 7

    const actors = movie.credits?.cast?.slice(0, MAX_NUMBER_OF_ACTORS) ?? [];

    const MovieInfo = (props) => (
      <MovieInfoContainer>
        <MovieInfoText>{props.text}: </MovieInfoText>
        <span>{props.value}</span>
      </MovieInfoContainer>
    )

    const RenderMovieRunTime = () => 
      movie.runtime ? (
        <div className="movie-runtime-cont">
          <span className="movie-runtime-text">Run Time: </span>
          <span>{ `${Math.floor(movie.runtime / 60)}h ${Math.floor(movie.runtime % 60)}m` }</span>
        </div>
      ) :
      null

    return ( 
      <div className="movie-overview-parent-container">

        {!moviePending && 
          <div className="movie-overview-container"
           style={{
            background: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center, center',
            boxShadow: 'inset 0 0 0 100vw #000000',
            color: '#fff'
          }}>
        
          <div className="movie-overview-poster">
            <img src={"http://image.tmdb.org/t/p/w342/" + movie.poster_path} alt=""/>
          </div>

          <div className="movie-info-description">
            <span className="movie-overview-title">{movie.title}</span>&nbsp;
            <span className="movie-release-date">({movie.release_date})</span>
            <div className="movie-tag-line">{movie.tagline}</div>

            <MovieInfo text="Rating" value={movie.vote_average} />

            <MovieInfo text="Status" value={movie.status} />

            <div className="movie-genres">
              <span className="movie-genres-text">Genres: </span>
              <span className="list-of-movies-genres">
                { movie.genres?.length > 0 && <span>{movie.genres.map((genre) => genre.name).join(', ')}</span> }
              </span>
            </div>

            <MovieInfo text="Language" value={this.movieLanguage()} />

            <RenderMovieRunTime />

            <MovieInfo text="About The Movie" value={movie.overview} />

            <div className="movie-overview-user-actions-cont">
              <Tooltip title="login to add to your favorite list" aria-label="add">
                <Fab color="primary">
                  {Constants.MOVIE_OVERVIEW_USER_ACTIONS_ICONS.FAVORITE_MOVIE}
                </Fab>
              </Tooltip>

              <Tooltip title="login to add to your watchlist" aria-label="add">
                <Fab color="primary">
                  {Constants.MOVIE_OVERVIEW_USER_ACTIONS_ICONS.WATCHLIST_MOVIE}
                </Fab>
              </Tooltip>

              <Tooltip title="login to add to rate this movie" aria-label="add">
                <Fab color="primary">
                  {Constants.MOVIE_OVERVIEW_USER_ACTIONS_ICONS.RATE_MOVIE}
                </Fab>
              </Tooltip>
            </div>

          </div>
  
        </div>}

        <Loader pendingState={moviePending} />

        {!moviePending && 
          <div className="movie-cast-cont">
            <div className="top-cast-text">Top Cast</div>
            <div className="actors-list">
              {movie.credits?.cast?.length > 0 && actors.map((actor) => (
                <Cast key={actor.cast_id} actor={actor} />
              ))}
            </div>
          </div>
        }

        {!moviePending && <MovieReviews reviews={movieReviews} />}

        {!moviePending && 
          <div className="recommendations-cont">
            <div className="recommendations-text">Recommendations</div>
            <div className="recommendations-list">
              {movie.recommendations?.results?.map((rm) => (
                <Link to={`/movie-overview/${rm.id}`} key={rm.id}>
                  <Movie movie={rm} />
                </Link>
              ))}
            </div>
          </div>
        }

      </div>

     );
  }
}

const mapStateToProps = (state) => { 
  return {
    movie: state.movie.movie,
    moviePending: state.movie.moviePending,
    movieReviews: state.movie.movieReviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(movieOverviewActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview)
