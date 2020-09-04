import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actionCreators'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie'
import { Link } from "react-router-dom";
import './style.css'
import MoviesLoader from '../MoviesLoader/MoviesLoader'
import MoviesError from '../MoviesError/MoviesError'

class UpComingMovies extends Component {
  
  componentDidMount() {
    this.props.fetchUpcomingMovies()
  }

  render() { 
    const { upcomingMovies } = this.props 
    return (
      
      <div className="upcoming-movies-main-container">
        
        <div className="upcoming-movies-sub-container">
          {upcomingMovies && upcomingMovies.map((ucm) => (
            <Link to={`/movie-overview/${ucm.id}`} key={ucm.id}>
              <Movie movie={ucm} key={ucm.id}>
              </Movie>
            </Link>
          ))}
        </div>

        <MoviesLoader pendingState={this.props.upcomingMoviesPending} />

        <MoviesError error={this.props.upcomingMoviesError} />
      
      </div>

     );
  }
}

const mapStateToProps = (state) => {
  return {
    upcomingMovies: state.upcomingMovies,
    upcomingMoviesPending: state.upcomingMoviesPending,
    upcomingMoviesError: state.upcomingMoviesError
  }
}
 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

UpComingMovies.propTypes = {
  upcomingMovies: PropTypes.array,
  fetchUpcomingMovies: PropTypes.func,
  upcomingMoviesError: PropTypes.bool,
  upcomingMoviesPending: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(UpComingMovies);