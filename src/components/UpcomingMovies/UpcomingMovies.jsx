import React, { useEffect } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import upcomingMoviesActions from '../../redux/actions/upcomingMoviesActions'
import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Constants from '../../constants/Constants'
import Movie from '../Movie/Movie'
import Loader from '../loader/loader'
import Error from '../error/error'

export const UpComingMovies = (props) => {

  const { upcomingMovies, error, pending, fetchUpcomingMovies } = props
  
  useEffect(() => {
    fetchUpcomingMovies()
  }, [])

  return (
    <UpcomingMoviesContainer>
        
      <SubContainer>
        {upcomingMovies && upcomingMovies.map((ucm) => (
          <Link to={`/movie-overview/${ucm.id}`} key={ucm.id}>
            <Movie movie={ucm} key={ucm.id} />
          </Link>
        ))}
      </SubContainer>

      <Loader pendingState={pending} />
      <Error errorText={Constants.ERROR_TEXT.FETCH_UPCOMING_MOVIES_ERROR_TEXT} error={error} />
      
    </UpcomingMoviesContainer>
  )

}

const mapStateToProps = (state) => {
  return {
    upcomingMovies: state.upcoming.upcomingMovies,
    pending: state.upcoming.pending,
    error: state.upcoming.error
  }
}
 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(upcomingMoviesActions, dispatch)
}

UpComingMovies.propTypes = {
  upcomingMovies: PropTypes.array,
  fetchUpcomingMovies: PropTypes.func,
  upcomingMoviesError: PropTypes.bool,
  upcomingMoviesPending: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(UpComingMovies);

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