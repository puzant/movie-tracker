import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actionCreators'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie'
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import Constants from '../../constants/Constants'
import styled from 'styled-components'

const UpcomingMoviesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`
class UpComingMovies extends Component {
  
  componentDidMount() {
    this.props.fetchUpcomingMovies()
  }

  render() { 
    const { upcomingMovies } = this.props 
    return (
      
      <UpcomingMoviesContainer>
        
        <SubContainer>
          {upcomingMovies && upcomingMovies.map((ucm) => (
            <Link to={`/movie-overview/${ucm.id}`} key={ucm.id}>
              <Movie movie={ucm} key={ucm.id}>
              </Movie>
            </Link>
          ))}
        </SubContainer>

        <Loader pendingState={this.props.upcomingMoviesPending} />

        <Error errorText={Constants.ERROR_TEXT.FETCH_UPCOMING_MOVIES_ERROR_TEXT} error={this.props.upcomingMoviesError} />
      
      </UpcomingMoviesContainer>

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