import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import * as actions from '../../redux/actions/actionCreators.js';
import {connect} from 'react-redux'
import queryString from 'query-string'
import Movie from '../Movie/Movie'
import emptyResultsLogo from '../../assets/empty-results.png'
import {
  Link
} from "react-router-dom";
import PropTypes from 'prop-types';

class SearchResults extends Component {

  componentDidMount() {
    const value = queryString.parse(this.props.location.search  )
    this.props.fetchMovieByQuery(value.search)
  }

  render() { 
    let { searchResults } = this.props

    const EmptySearchResults = (props) => {
      return props.searchResults == 0 && <div className="no-results"><img src={emptyResultsLogo} alt=""/></div>
    }

    return ( 
      <div className="search-results-container">

        <EmptySearchResults searchResults={searchResults} />

        {searchResults.map(movie => (
          <Link to={`/movie-overview/${movie.id}`} key={movie.id}>
            <Movie 
              movie={movie}
              key={movie.id}
            >
          </Movie>
        </Link>
        )) }
        
      </div>
     );
  }
}
 
const mapStateToProps = (state) => { 
  return {
    searchResults: state.searchResults,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

SearchResults.propTypes = {
  searchResults: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)