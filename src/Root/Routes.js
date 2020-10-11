import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

import DiscoverMovies from '../components/DiscoverMovies/DiscoverMovies'
import MovieOverview from '../components/MoviesOverview/MoviesOverview'
import SearchResults from '../components/SearchResults/SearchResults'
import UpcomingMovies from '../components//UpcomingMovies/UpcomingMovies'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import GuardedRoute from './GuardedRoute'

const notFoundPage = () => <ErrorPage errorText="Page Not Found"/>

const Routes = () => {
 
  return (
    <Switch>
      <Route path="/" exact component={DiscoverMovies} />
      <Route path="/movie-overview/:movieId" exact component={MovieOverview} />
      <Route path="/search-results" exact component={SearchResults} />
      <Route path="/upcoming-movies" exact component={UpcomingMovies} />
      <GuardedRoute path="/profile" exact />
      <Route component={notFoundPage} />
  </Switch>
  )

}

export default Routes