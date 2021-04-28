import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, RootStateOrAny, useSelector } from "react-redux"
import { fetchUpcomingMovies } from '../../redux/actions/upcomingMoviesActions'
import { Link } from 'react-router-dom'
import Constants from '../../constants/Constants'
import Movie from '../movie/movie'
import Loader from '../loader/loader'
import Error from '../error/error'
import { Block, BlockGroup } from '../layout/block/block'
import { IMovie } from '../../api/Models'

export interface UpcomingMoviesProps {
  upcoming: {
    pending: boolean 
    error: boolean
    upcomingMovies: IMovie[]
  }
}

export const UpcomingMovies = () => {

  const dispatch = useDispatch()
  const upcomingMovies = useSelector((state: UpcomingMoviesProps) => state.upcoming.upcomingMovies)
  const pending = useSelector((state: UpcomingMoviesProps) => state.upcoming.pending)
  const error = useSelector((state: UpcomingMoviesProps) => state.upcoming.error)
  
  useEffect(() => {
    dispatch(fetchUpcomingMovies())
  }, [dispatch])

  return (
    <BlockGroup gap={10}>
        
      <Block justify='center' layout='horizontal' wrapped>
        {upcomingMovies && upcomingMovies.map((ucm: IMovie) => (
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
