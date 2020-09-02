import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actionCreators'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie'
import { Link } from "react-router-dom";
import './style.css'
class UpComingMovies extends Component {
  
  componentDidMount() {
    this.props.fetchUpcomingMovies()
  }

  render() { 
    const { upcomingMovies } = this.props 
    return ( 
      <div className="upcoming-movies-container">
        {upcomingMovies && upcomingMovies.map((ucm) => (
          <Link to={`/movie-overview/${ucm.id}`} key={ucm.id}>
            <Movie movie={ucm} key={ucm.id} />
          </Link>
        ))}
      </div>
     );
  }
}

const mapStateToProps = (state) => {
  return {
    upcomingMovies: state.upcomingMovies
  }
}
 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

UpComingMovies.propTypes = {
  upcomingMovies: PropTypes.array,
  fetchUpcomingMovies: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(UpComingMovies);