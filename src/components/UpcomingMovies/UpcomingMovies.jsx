import React, { useEffect } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import upcomingMoviesActions from '../../redux/actions/upcomingMoviesActions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Constants from '../../constants/Constants'
import Movie from '../movie/movie'
import Loader from '../loader/loader'
import Error from '../error/error'
import { Block, BlockGroup } from '../layout/block/block'

export const UpComingMovies = ({ upcomingMovies, error, pending, fetchUpcomingMovies}) => {
  
  useEffect(() => {
    fetchUpcomingMovies()
  }, [])

  return (
    <BlockGroup marginTop='20'>
        
      <Block justify='center' layout='horizontal' wrap>
        {upcomingMovies && upcomingMovies.map((ucm) => (
          <StyledLink to={`/movie-overview/${ucm.id}`} key={ucm.id}>
            <Movie movie={ucm} key={ucm.id} />
          </StyledLink>
        ))}
      </Block>

      <Loader pendingState={pending} />
      <Error errorText={Constants.ERROR_TEXT.FETCH_UPCOMING_MOVIES_ERROR_TEXT} error={error} />
      
    </BlockGroup>
  )

}

const StyledLink = styled(Link)`
  color: #111;
  text-decoration: none;
`

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
