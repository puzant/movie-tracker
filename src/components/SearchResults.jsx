import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import * as actions from '../redux/actionCreators.js';
import {connect} from 'react-redux'
import queryString from 'query-string'
import Movie from './Movie'
import {
  Link
} from "react-router-dom";

class SearchResults extends Component {

  componentDidMount() {
    const value = queryString.parse(this.props.location.search  )
    this.props.fetchMovieByQuery(value.search)
  }

  render() { 
    let { searchResults } = this.props
    return ( 
      <div className="search-results-container">

        {searchResults === 0 ? <div className="no-results"><img src="https://i.pinimg.com/originals/20/d3/8b/20d38b1d0d3304dd80adc2e4029278ac.png" alt=""/></div> : ""}

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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)