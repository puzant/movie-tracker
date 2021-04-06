import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import queryString from 'query-string'
import searchMoviesActions from '../../redux/actions/searchMoviesActions'
import Loader from '../loader/loader'
import Movie from '../movie/movie'
import emptyResultsLogo from '../../assets/empty-results.png'
import { Block } from '../layout/block/block'
import { IMovie } from '../../api/Models';

export interface SearchResultsProps {
  searchResults: IMovie[]
  searchResultsPending: boolean
  emptySearchResults: boolean
  fetchMovieByQuery: (query: string) => void
  location: Location
}

const SearchResults = ({
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)

const StyledLink = styled(Link)`
  color: #111;
  text-decoration: none;
`
