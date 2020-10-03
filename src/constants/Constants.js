export default {
  ERROR_TEXT: {
    FETCH_MOVIES_ERROR_TEXT: 'There was an error while fetching the movies!',
    FETCH_UPCOMING_MOVIES_ERROR_TEXT: 'There an was error while fetching the upcoming movies!',
    FETCH_MOVIE_ERROR_TEXT: 'There was an error while fetching the movie information',
    FETCH_MOVIE_REVIEWS_ERROR_TEXT: 'There was an error while fetching the movie reviews'
  },
  SORTING_MENU_TEXT: 'Sort',
  FILTERING_MENU_TEXT: 'Filter',
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
    {navItemName: 'Discover Movies', routePath: '/'},
    {navItemName: 'Upcoming Movies', routePath: '/upcoming-movies'},
    {navItemName: 'TV Shows', routePath: '/tv'}
  ]
}