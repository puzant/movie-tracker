import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import searchMoviesActions from '../../redux/actions/searchMoviesActions'
import {connect} from 'react-redux'
import queryString from 'query-string'
import Loader from '../loader/loader'
import Movie from '../Movie/Movie'
import emptyResultsLogo from '../../assets/empty-results.png'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Block } from '../layout/block/block'

class SearchResults extends Component {

  componentDidMount() {
    const value = queryString.parse(this.props.location.search)
    this.props.fetchMovieByQuery(value.search)
  }

  render() { 
    let { searchResults, searchResultsPending, emptySearchResults } = this.props

    return ( 
      <Block layout='horizontal' justify='center' marginTop='20' wrap>

        {emptySearchResults && <><img src={emptyResultsLogo} alt=""/></>}

        {searchResults?.map(movie => (
          <Link to={`/movie-overview/${movie.id}`} key={movie.id}>
            <Movie 
              movie={movie}
              key={movie.id}
            >
          </Movie>
        </Link>
        ))}

        {searchResultsPending && <Loader pendingState={searchResultsPending} />}
        
      </Block>
    );
  }
}

const mapStateToProps = (state) => { 
  return {
    searchResults: state.search.searchResults,
    searchResultsPending: state.search.pending,
    searchResultsError: state.search.error,
    emptySearchResults: state.search.empty
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(searchMoviesActions, dispatch)
}

SearchResults.propTypes = {
  searchResults: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)