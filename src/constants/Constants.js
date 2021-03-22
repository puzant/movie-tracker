import React from 'react';
import DiscoverIcon from '@material-ui/icons/Movie';
import UpcomingIcon from '@material-ui/icons/Update';
import TvICon from '@material-ui/icons/Tv';
import ProfileIcon from '@material-ui/icons/AccountCircle'
import UserLogIn from '@material-ui/icons/ExitToApp'
import Favorite from '@material-ui/icons/Favorite'
import Bookmark from '@material-ui/icons/Bookmark'
import Star from '@material-ui/icons/Star'
import EmojiPeople from '@material-ui/icons/EmojiPeople'

export default {
  ERROR_TEXT: {
    FETCH_MOVIES_ERROR_TEXT: 'There was an error while fetching the movies!',
    FETCH_UPCOMING_MOVIES_ERROR_TEXT: 'There an was error while fetching the upcoming movies!',
    FETCH_MOVIE_ERROR_TEXT: 'There was an error while fetching the movie information',
    FETCH_MOVIE_REVIEWS_ERROR_TEXT: 'There was an error while fetching the movie reviews'
  },
  FILTER_TYPES: [
    {TEXT_TITLE: 'Highest Rating', FILTER_NAME: 'highestRating'},
    {TEXT_TITLE: 'Adult' , FILTER_NAME: 'adult'} 
  ],
  SORTING_OPTIONS: [
    {TEXT_TITLE: 'Popularity Descending', SORTING_NAME: 'popularityDescending'},
    {TEXT_TITLE: 'Popularity Ascending', SORTING_NAME: 'popularityAscending'},
    {TEXT_TITLE: 'Rating Descending', SORTING_NAME: 'ratingDescending'},
    {TEXT_TITLE: 'Rating Ascending', SORTING_NAME: 'ratingAscending'},
    {TEXT_TITLE: 'Release Date Descending', SORTING_NAME: 'releaseDateDescending'},
    {TEXT_TITLE: 'Release Date Ascending', SORTING_NAME: 'releaseDateAscending'}
  ],
  TMDB_API_DATA: {
    RELEASE_DATE: 'release_date',
    VOTE_AVERAGE: 'vote_average',
    VOTE_COUNT: 'vote_count',
    MOVIE_POPULARITY: 'popularity'
  },
  NAVBAR_ITEMS: [
    {navItemName: 'Discover', routePath: '/', icon: <DiscoverIcon />, requireAuth: false},
    {navItemName: 'Upcoming', routePath: '/upcoming-movies', icon: <UpcomingIcon />, requireAuth: false},
    {navItemName: 'TV Shows', routePath: '/tv', icon: <TvICon />, requireAuth: false},
    {navItemName: 'People', routePath: '/people', icon: <EmojiPeople />, requireAuth: false},
    {navItemName: 'Profile', routePath: '/profile', icon: <ProfileIcon />, requireAuth: true},
    {navItemName: 'Login', routePath: '/login', icon: <UserLogIn />, requireAuth: false}
  ],
  //  ISO 639-1 Code
  MOVIE_LANGUAGE_CODE: {
    ENGLISH: 'en',
    FRENCH: 'fr',
    JAPANESE: 'jp',
    KOREAN: 'ko',
  },
  MOVIE_OVERVIEW_USER_ACTIONS_ICONS: {
    FAVORITE_MOVIE: <Favorite />,
    WATCHLIST_MOVIE: <Bookmark />,
    RATE_MOVIE: <Star />
  }
}