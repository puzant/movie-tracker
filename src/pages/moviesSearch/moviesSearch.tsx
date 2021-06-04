import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import searchMoviesActions from 'redux/actions/searchMoviesActions'

import { IMovie } from 'api/Models';

import queryString from 'query-string'

import Loader from 'components/loader/loader'
import Movie from 'components/movie/movie'
import emptyResultsLogo from 'assets/empty-results.png'
import { Block } from 'components/common/block/block'

export interface SearchResultsProps {
  searchResults: IMovie[]
  searchResultsPending: boolean
  emptySearchResults: boolean
  fetchMovieByQuery: (query: string) => void
  location: Location
}

const MoviesSearch = ({
  searchResults,
  searchResultsPending,
  emptySearchResults,
  fetchMovieByQuery,
  location 
}: SearchResultsProps) => {

  const value: any = queryString.parse(location.search)

  useEffect(() => {
    fetchMovieByQuery(value.search)
  }, [])

  return ( 
    <Block layout='horizontal' justify='center' wrapped>

      {emptySearchResults && <><img src={emptyResultsLogo} alt=""/></>}

      {searchResults?.map((movie: IMovie) => (
        <StyledLink to={`/movie-overview/${movie.id}`} key={movie.id}>
          <Movie 
            movie={movie}
            key={movie.id}
          />
      </StyledLink>
      ))}

      {searchResultsPending && <Loader pendingState={searchResultsPending} />}
      
    </Block>
  );

}

const mapStateToProps = (state: any) => { 
  return {
    searchResults: state.search.searchResults,
    searchResultsPending: state.search.pending,
    searchResultsError: state.search.error,
    emptySearchResults: state.search.empty
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(searchMoviesActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesSearch)

const StyledLink = styled(Link)`
  color: #111;
  text-decoration: none;
`
