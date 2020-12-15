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
import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Constants from '../../constants/Constants'
import styled from 'styled-components'

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
      selectedGenres: [],
      filterMenuAnchorEl: null,
      sortMenuAnchorEl: null
    }
  }
  
  componentDidMount() {
    this.props.fetchMovies()
    this.props.fetchMoviesGenres()
  }

  handleSort(movies, sortingType) {
    this.props.sortMovies(movies, sortingType)
  }

  handleFilter(movies, filterType) {
    this.props.filterMovies(movies, filterType)
  }

  handleFilteringByGenres = id => {
    this.setState({ 
      selectedGenres: [...this.state.selectedGenres, id]
    }, () => this.props.filterMoviesBasedByGenres(this.state.selectedGenres))
  }

  handleClosingFiltertMenu = () => {
    this.setState({ filterMenuAnchorEl: null })
  }

  handleFilterMenuClick = (event) => {
    this.setState({ filterMenuAnchorEl:  event.currentTarget})
  }

  handleClosingSortingtMenu = () => {
    this.setState({ sortMenuAnchorEl: null })
  }

  handleSortingrMenuClick = (event) => {
    this.setState({ sortMenuAnchorEl:  event.currentTarget})
  }

  render() {

    const DiscoverMoviesText = () => (
      <div className="discover-movies-text">
        <div className="movies-number">Discover New Movies</div>
      </div>
    )

    const MoreMoviesLoader = (props) => (
      <div className="load-more-movies">
        {props.loadMorePendingState && props.movies && <img className="movies-loader" src={loader} alt=""/>}
      </div>
    )

    let {genres, movies} = this.props
    const { filterMenuAnchorEl, sortMenuAnchorEl } = this.state

    return ( 

      <div className="discover-movies-container">

        <div className="movies-list-controllers">

          <DiscoverMoviesText />

          <div className="sort-filter-movies-container">

            <div className="sort-movies-container">
              <img onClick={this.handleSortingrMenuClick} className="sort-logo" src={sortLogo} alt=""/>
              <span className="sort-text">{Constants.SORTING_MENU_TEXT}</span>
              <Menu 
                id="sort-menu"
                anchorEl={sortMenuAnchorEl}
                keepMounted
                open={Boolean(sortMenuAnchorEl)}
                onClose={this.handleClosingSortingtMenu}>

                {Constants.SORTING_OPTIONS.map((sortOpt, index) => (
                  <MenuItem key={index}
                    onClick={() => {this.handleClosingSortingtMenu(); this.handleSort(movies, sortOpt.SORTING_NAME)}}>
                    {sortOpt.TEXT_TITLE}
                  </MenuItem>
                ))}
              </Menu>
          </div>

          <div className="filter-movies-container">
            <img onClick={this.handleFilterMenuClick} className="filter-logo" src={filterLogo} alt=""/>
            <span className="filter-text dropbtn">{Constants.FILTERING_MENU_TEXT}</span>
              <Menu 
                id="filter-menu"
                anchorEl={filterMenuAnchorEl}
                keepMounted
                open={Boolean(filterMenuAnchorEl)}
                onClose={this.handleClosingFiltertMenu}>

                {Constants.FILTER_TYPES.map((filterType) =>(
                  <MenuItem key={filterType.FILTER_NAME}
                    onClick={() => {this.handleClosingFiltertMenu(); this.handleFilter(movies, filterType.FILTER_NAME)}}>
                      {filterType.TEXT_TITLE}
                  </MenuItem>
                ))}

              </Menu>
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

            {movies.map(movie => (
              <Link to={`/movie-overview/${movie.id}`} key={movie.id}>
                <Movie
                  movie={movie}
                  key={movie.id}
                >
              </Movie>
            </Link>
            )) }

          </div>
        
            
        <Loader pendingState={this.props.pendingState} />
        
        <MoreMoviesLoader loadMorePendingState={this.props.loadMorePendingState} movies={this.props.movies} />

        <Error errorText={Constants.ERROR_TEXT.FETCH_MOVIES_ERROR_TEXT} error={this.props.errorState} />

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