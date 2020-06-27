import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import * as actions from '../redux/actionCreators.js';
import {connect} from 'react-redux'

class MovieOverview extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.fetchMovieById(params.movieId)
  }

  render() { 
    let { movie } = this.props
    // let { genres } = this.props.genres

    return ( 
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

          <div className="movie-home-page">
            <span className="movie-home-page-text">Home Page: </span>
            <span className="movie-website-link"> <a href={movie.homepage} target="_blank">{movie.homepage}</a></span>
          </div>

          <div className="movie-language">
            <span className="language-text">Language: </span>
            <span>{movie.original_language == 'en' ? "English" : movie.original_language}</span>
          </div>

        </div>
      
      </div>
     );
  }
}

const mapStateToProps = (state) => { 
  return {
    movie: state.movie,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview)

