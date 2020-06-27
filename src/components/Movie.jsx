import React, { Component } from 'react';

class Movie extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="movie-container">

        <div className="movie-poster">
          <img src={this.props.movie.poster_path ? "http://image.tmdb.org/t/p/w185/" + this.props.movie.poster_path : "https://cinemaone.net/images/movie_placeholder.png"} alt=""/>
        </div>

        <div className="movie-title-rating">
          <div className="movie-title">{this.props.movie.title}</div>
          <div className="movie-rating">Rating: <span className="rating-value">{this.props.movie.vote_average}</span></div>
        </div>

        <div className="movie-release-date">
           {this.props.movie.release_date}
        </div>      

      </div>
     );
  }
}
 
export default Movie;