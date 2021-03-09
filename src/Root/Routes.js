import React from 'react'
import { Switch, Route } from "react-router-dom";
import DiscoverMovies from '../components/discoverMovies/discoverMovies'
import MovieOverview from '../components/movieOverview/movieOverview'
import SearchResults from '../components/searchResults/searchResults'
import UpcomingMovies from '../components/upcomingMovies/upcomingMovies'
import Login from '../components/login/login'
import { ErrorPage } from '../components/errorPage/errorPage'
import GuardedRoute from './guardedRoute'

const notFoundPage = () => <ErrorPage errorText="Page Not Found"/>

const Routes = () => {

  return (
    <Switch>
      <Route path="/" exact component={DiscoverMovies} />
      <Route path="/movie-overview/:movieId" exact component={MovieOverview} />
      <Route path="/search-results" exact component={SearchResults} />
      <Route path="/upcoming-movies" exact component={UpcomingMovies} />
      <Route path ="/login" exact component={Login} />
      <GuardedRoute path="/profile" exact />
      <Route component={notFoundPage} />
    </Switch>
  )
}

export default Routes