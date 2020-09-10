import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import * as actions from '../../redux/actions/actionCreators.js';
import {connect} from 'react-redux'
import MoviesReviews from '../MovieReviews/MovieReviews'

class MovieOverview extends Component {

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.fetchMovieById(params.movieId)
    this.props.fetchMovieReviews(params.movieId)
  }

  movieLanguage() {
    switch(this.props.movie.original_language) {
      case "en":
        return "English"
      case "fr":
        return "French"
      case "jp":
        return "japanese"
      case "ko":
        return "korean"
      default:
        return "English"
    }
  }

  render() { 

    let { movie } = this.props

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

        <div className="movie-overview-container">
        
          <div className="movie-poster">
            <img src={"http://image.tmdb.org/t/p/w185/" + movie.poster_path} alt=""/>
          </div>

          <div className="movie-info-description">
            <span className="movie-overview-title">{movie.title}</span>&nbsp;
            <span className="movie-release-date">({movie.release_date})</span>
            <div className="movie-tag-line">{movie.tagline}</div>

            <div className="movie-overview">
              <div className="overview-text">About The Movie</div> 
              <span>{movie.overview}</span>
            </div>

            <div className="movie-overview-rating">
              <span className="rating-text">Rating: </span>
              <span>{movie.vote_average} / 10</span>
            </div>

            {movie.homepage && <div className="movie-home-page">
              <span className="movie-home-page-text">Home Page: </span>
              <span className="movie-website-link"> <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a></span>
            </div>}

            <div className="movie-genres">
              <div className="movie-genres-text">Genres: </div>
              <div className="list-of-movies-genres">
                { movie.genres?.length > 0 && <span>{movie.genres.map((genre) => genre.name).join(', ')}</span> }
              </div>
            </div>

            <div className="movie-language">
              <span className="language-text">Language: </span>
              <span>{movie.original_language && this.movieLanguage()}</span>
            </div>

            <RenderMovieRunTime />

          </div>
        </div>

        <MoviesReviews reviews={this.props.movieReviews} />

      </div>

     );
  }
}

const mapStateToProps = (state) => { 
  return {
    movie: state.movie,
    movieReviews: state.movieReviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview)
