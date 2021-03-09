/** TODO: Refator to functional component */
import React, { Component } from 'react';
import Movie from '../Movie/Movie'
import sortLogo from '../../assets/sort.svg'
import filterLogo from '../../assets/filter.svg'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moviesActions from '../../redux/actions/discoverMoviesActions'
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import './style.css'
import PropTypes from 'prop-types';
import Loader from '../loader/loader'
import Error from '../error/error'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Constants from '../../constants/Constants'
import styled from 'styled-components'
import { Block, BlockGroup } from '../layout/block/block'

const MoviesListControllers = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  width: 82%;
`

const MovieFiltersContainer = styled(Block)``

const DiscoverMoviesText = styled.div`
  font-weight: bold;
  font-size: 20px;
`

const GenersText = styled.div`
  font-weight: bold;
`

const GenresFiltersContainer = styled.div`
  width: 85%;
  overflow: scroll;
  display: flex; 
  flex-wrap: wrap;
  justify-content: flex-start;
  @media (max-width: 600px) {
    width: 300px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow: scroll;
  }
`

const MovieGenre = styled.span`
  border: 1px solid #0000003b;
  color: #000000de;
  background: ${props => props.selectedGenre && '#f5f0f0'};
  margin: 4px;
  padding: 8px;
  border-radius: 15px;
  transition: .5s;
  &:hover {
    cursor: pointer;
    background: #f5f0f0;
  }
`

const GenresContainer = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  width: 82%;
`

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
    this.setState({ sortMenuAnchorEl:  null})
  }

  handleFilter(movies, filterType) {
    this.props.filterMovies(movies, filterType)
    this.setState({ filterMenuAnchorEl: null })
  }

  handleFilteringByGenres = id => {
    this.setState({ 
      selectedGenres: [...this.state.selectedGenres, id]
    }, () => this.props.filterMoviesBasedByGenres(this.state.selectedGenres))
  }

  render() {

    const MoreMoviesLoader = (props) => (
      <Block align='center'>
        {props.loadMorePendingState && <Loader pendingState={props.loadMorePendingState} />}
      </Block>
    )

    const { genres, movies } = this.props
    const { filterMenuAnchorEl, sortMenuAnchorEl } = this.state

    return (
      <BlockGroup marginTop='20' gap={15}>

        <MoviesListControllers>

          <DiscoverMoviesText>Discover new Movies</DiscoverMoviesText>

          <MovieFiltersContainer layout='horizontal' align='center' gap={15}>

            <BlockGroup>
              <Block layout='horizontal' gap={5}>
                <img onClick={(e) => this.setState({ sortMenuAnchorEl:  e.currentTarget})} src={sortLogo} alt="sort_logo" />
                <span>Sort</span>
              </Block>
              <Menu 
                id="sort-menu"
                anchorEl={sortMenuAnchorEl}
                keepMounted
                open={Boolean(sortMenuAnchorEl)}
                onClose={() => this.setState({ sortMenuAnchorEl: null })}
                >
                {Constants.SORTING_OPTIONS.map((sortOpt, index) => (
                  <MenuItem key={index}
                    onClick={() =>  this.handleSort(movies, sortOpt.SORTING_NAME)}>
                    {sortOpt.TEXT_TITLE}
                  </MenuItem>
                ))}
              </Menu>
            </BlockGroup>

          <BlockGroup>
            <Block layout='horizontal' gap={5}>
              <img onClick={(e) => this.setState({ filterMenuAnchorEl:  e.currentTarget})} src={filterLogo} alt="filter_logo" />
              <span>Filter</span>
            </Block>
              <Menu 
                id="filter-menu"
                anchorEl={filterMenuAnchorEl}
                keepMounted
                open={Boolean(filterMenuAnchorEl)}
                onClose={() => this.setState({ filterMenuAnchorEl: null})}
              >
                {Constants.FILTER_TYPES.map((filterType) =>(
                  <MenuItem key={filterType.FILTER_NAME}
                    onClick={() => this.handleFilter(movies, filterType.FILTER_NAME)}>
                      {filterType.TEXT_TITLE}
                  </MenuItem>
                ))}
              </Menu>
          </BlockGroup>

        </MovieFiltersContainer>

        </MoviesListControllers>

          <GenresContainer>
            <GenersText>Genres:</GenersText>
            <GenresFiltersContainer>
            {genres?.map(genre => (
              <MovieGenre
                key={genre.id}
                selectedGenre={this.state.selectedGenres.includes(genre.id)}
                onClick={() => this.handleFilteringByGenres(genre.id)}
              >
                {genre.name}
              </MovieGenre>
            )) }
            </GenresFiltersContainer>
          </GenresContainer> 
        
          <Block layout='horizontal' justify='center' wrap>
            {movies?.map(movie => (
              <Link to={`/movie-overview/${movie.id}`} key={movie.id}>
                <Movie
                  movie={movie}
                  key={movie.id}
                >
              </Movie>
            </Link>
            )) }
          </Block>
        
        <Loader pendingState={this.props.pendingState} />
        <MoreMoviesLoader loadMorePendingState={this.props.loadMorePendingState} movies={this.props.movies} />
        <Error errorText={Constants.ERROR_TEXT.FETCH_MOVIES_ERROR_TEXT} error={this.props.errorState} />

      </BlockGroup>
    );
  }
}

const mapStateToProps = (state) => { 
  return {
    movies: state.discover.movies,
    pendingState: state.discover.pending,
    loadMorePendingState: state.discover.loadMorePending,
    loadMoreMoviesError: state.discover.loadMoreError,
    errorState: state.discover.error,
    genres: state.discover.genres
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(moviesActions, dispatch)
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
