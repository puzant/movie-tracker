import React, { Component } from 'react';
import Movie from './Movie'
import loader from '../loader-dotted.gif'
import sortLogo from '../sort.svg'
import filterLogo from '../filter.svg'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../redux/actionCreators.js';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class DiscoverMovies extends Component {  

  constructor(props) {
    super(props);
  } 

  componentDidMount() {
    this.props.fetchMovies()
  }

  handleSort(movies) {
    this.props.sortMovies(movies)
  }

  handleFilter(movies) {
    this.props.filterMovies(movies)
  }

  render() {     
    let { movies } = this.props
    return ( 

      <div className="discover-movies-container">

        <div className="movies-list-controllers">

          <div className="movies-number-container">
            <div className="movies-number">Number of movies: {this.props.movies.length}</div>
          </div>

          <div className="sort-filter-movies-container">
            <div className="sort-movies-container">
              <img onClick={() => this.handleSort(movies)} className="sort-logo" src={sortLogo} alt=""/>
              <span className="sort-text">Sort</span>
          </div>

          <div className="filter-movies-container">
            <img onClick={() => this.handleFilter(movies)} className="filter-logo" src={filterLogo} alt=""/>
            <span className="filter-text">Filter</span>
          </div>
        </div>

        </div>
      
        <div className="movies-list-container">
          
          {!this.props.pendingState && movies.map(movie => (
            <Link to={`/movie-overview/${movie.id}`} key={movie.id}>
              <Movie 
              movie={movie}
              key={movie.id}
            >
            </Movie>
          </Link>
          )) }
          
        </div>

        <div className="movie-loader-container">
          {this.props.pendingState && <img className="movies-loader" src={loader} />}
        </div>

        {this.props.error && <div className="movies-error">
          <div className="error-text">There was error while fetching the movies</div>
        </div>}

      </div>
     );
  }
}

const mapStateToProps = (state) => { 
  return {
    movies: state.movies,
    pendingState: state.pending,
    errorState: state.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovies)