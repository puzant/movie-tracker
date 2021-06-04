import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Switch, Route } from "react-router-dom"

import DiscoverMovies from '../pages/discoverMovies/discoverMovies'
import MovieOverview from '../pages/movieOverview/movieOverview'
import MoviesSearch from '../pages/moviesSearch/moviesSearch'
import UpcomingMovies from '../pages/upcomingMovies/upcomingMovies'
import Login from '../pages/login/login'
import NotFound from '../pages/notFound/notFound'

import GuardedRoute from './guardedRoute'

const notFoundPage = () => <NotFound errorText="Page Not Found"/>

const Routes = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Switch>
      <Route path="/" exact component={DiscoverMovies} />
      <Route path="/movie-overview/:movieId" exact component={MovieOverview} />
      <Route path="/search-results" exact component={MoviesSearch} />
      <Route path="/upcoming-movies" exact component={UpcomingMovies} />
      <Route path ="/login" exact component={Login} />
      <Route component={notFoundPage} />
    </Switch>
  )
}

export default Routes