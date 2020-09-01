import React, { Component } from 'react';
import Movie from '../Movie/Movie'
import loader from '../../assets/loader-dotted.gif'
import sortLogo from '../../assets/sort.svg'
import filterLogo from '../../assets/filter.svg'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/actionCreators'
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import './style.css'
import PropTypes from 'prop-types';

class DiscoverMovies extends Component {  

  constructor(props) {
    super(props);
    let pagesCounter = 2
    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        this.props.fetchMoreMovies(pagesCounter)
        pagesCounter++
      }
    }, 100);
    this.state = {
      selectedGenres: []
    }
  }
  
  componentDidMount() {
    this.props.fetchMovies()
    this.props.fetchMoviesGenres()
  }

  handleSort(movies) {
    this.props.sortMovies(movies)
  }

  handleFilter(movies, filterType) {
    this.props.filterMovies(movies, filterType)
  }

  handleFilteringByGenres = id => {
    this.setState({ 
      selectedGenres: [...this.state.selectedGenres, id]
    }, () => this.props.filterMoviesBasedByGenres(this.state.selectedGenres))
  }

  render() {

    const NumberOfMovies = (props) => (
      <div className="movies-number-container">
        <div className="movies-number">Number of movies: {props.moviesNumber}</div>
      </div>
    )

    const MoviesLoader = (props) => (
      <div className="movie-loader-container">
          {props.pendingState && <img className="movies-loader" src={loader} />}
      </div>
    )

    const MoreMoviesLoader = (props) => (
      <div className="load-more-movies">
        {props.loadMorePendingState && props.movies && <img className="movies-loader" src={loader} alt=""/>}
      </div>
    )

    const MoviesError = (props) => (
      props.error &&
      <div className="movies-error">
        <div className="error-text">There was error while fetching the movies</div>
      </div> 
    )

    let {genres} = this.props
    let { movies } = this.props

    return ( 

      <div className="discover-movies-container">

        <div className="movies-list-controllers">

          <NumberOfMovies moviesNumber={this.props.movies.length} />

          <div className="sort-filter-movies-container">
            <div className="sort-movies-container">
              <img onClick={() => this.handleSort(movies)} className="sort-logo" src={sortLogo} alt=""/>
              <span className="sort-text">Sort</span>
          </div>

          <div className="filter-movies-container">
            <img  className="filter-logo" src={filterLogo} alt=""/>
            <span className="filter-text dropbtn">Filter</span>
              <div className="dropdown-content">
                <a onClick={() => this.handleFilter(movies, "highestRating")} href="#">Highest Rating</a>
                <a onClick={() => this.handleFilter(movies, "adult")} href="#">Adult</a>
              </div>
          </div>
        </div>

        </div>

        <div className="movies-genres-selector-container">
          <div className="genres-text">Genres:</div>
          <div className="genres-filter-container">
          {!this.genres?.length > 0 && genres.map(genre => (
            <span onClick={() => this.handleFilteringByGenres(genre.id)} 
              className={`movie-genre + ${this.state.selectedGenres.includes(genre.id) ? "selected-genre" : ""}`} 
              key={genre.id}>
              {genre.name}
            </span>
          )) }
          </div>
        </div>
      
        
          <div className="movies-list-container">

            {!this.props.pendingState && movies.map(movie => (
              <Link to={`/movie-overview/${movie.id}`} key={movie.id}>
                <Movie
                  movie={movie}
                  key={movie.id}
                >
              </Movie>
            </Link>
            )) }

          </div>
        
            
        <MoviesLoader pendingState={this.props.pendingState} />
        
        <MoreMoviesLoader loadMorePendingState={this.props.loadMorePendingState} movies={this.props.movies} />

        <MoviesError error={this.props.errorState} />

      </div>
     );
  }
}

const mapStateToProps = (state) => { 
  return {
    movies: state.movies,
    pendingState: state.pending,
    loadMorePendingState: state.loadMorePending,
    loadMoreMoviesError: state.loadMoreMoviesError,
    errorState: state.error,
    genres: state.genres
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

DiscoverMovies.propTypes = {
  movies: PropTypes.array,
  pendingState: PropTypes.bool,
  loadMorePendingState: PropTypes.bool,
  loadMoreMoviesError: PropTypes.bool,
  errorState: PropTypes.bool,
  genres: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovies)