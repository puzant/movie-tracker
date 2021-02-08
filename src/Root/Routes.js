import React from 'react'
import { Switch, Route } from "react-router-dom";
import DiscoverMovies from '../components/discoverMovies/discoverMovies'
import MovieOverview from '../components/movieOverview/movieOverview'
import SearchResults from '../components/searchResults/searchResults'
import UpcomingMovies from '../components/upcomingMovies/upcomingMovies'
import Login from '../components/login/login'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import GuardedRoute from './guardedRoute'
import { AnimatedSwitch } from 'react-router-transition';

const notFoundPage = () => <ErrorPage errorText="Page Not Found"/>

const Routes = () => {
 
  return (
    <Switch>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/" exact component={DiscoverMovies} />
        <Route path="/movie-overview/:movieId" exact component={MovieOverview} />
        <Route path="/search-results" exact component={SearchResults} />
        <Route path="/upcoming-movies" exact component={UpcomingMovies} />
        <Route path ="/login" exact component={Login} />
        <GuardedRoute path="/profile" exact />
        <Route component={notFoundPage} />
      </AnimatedSwitch>   
    </Switch>
  )
}

export default Routes