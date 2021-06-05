import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { IMovie } from 'api/Models'
import { getUpcomingMovies } from 'api/apis/movies'

import Constants from 'constants/Constants'

import Movie from 'components/movie/movie'
import Loader from 'components/loader/loader'
import Error from 'components/error/error'
import { Block, BlockGroup } from 'components/common/block/block'

import { useQuery } from 'react-query'

export interface UpcomingMoviesProps {
  upcoming: {
    pending: boolean 
    error: boolean
    upcomingMovies: IMovie[]
  }
}

const UpcomingMovies = () => {

  const { isLoading, error, data } = useQuery('upcomingMovies', getUpcomingMovies)

  return (
    <BlockGroup gap={10}>
        
      <Block justify='center' layout='horizontal' wrapped>
        {data && data.map((ucm: IMovie) => (
          <StyledLink to={`/movie-overview/${ucm.id}`} key={ucm.id}>
            <Movie movie={ucm} key={ucm.id} />
          </StyledLink>
        ))}
      </Block>

      <Loader pendingState={isLoading} />
      {/* <Error errorText={Constants.ERROR_TEXT.FETCH_UPCOMING_MOVIES_ERROR_TEXT} error={error} /> */}
      
    </BlockGroup>
  )

}

const StyledLink = styled(Link)`
  color: #111;
  text-decoration: none;
`

export default UpcomingMovies