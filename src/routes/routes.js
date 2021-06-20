import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import {
  DiscoverMoviesConnected as DiscoverMovies,
  MovieOverviewConnected as MovieOverview,
  MoviesSearchConnected as MoviesSearch,
  UpcomingMoviesConnected as UpcomingMovies,
  LoginConnected as Login,
  NotFound,
} from "pages";

import GuardedRoute from "./guardedRoute";

const notFoundPage = () => <NotFound errorText="Page Not Found" />;

const Routes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Switch>
      <Route path="/" exact component={DiscoverMovies} />
      <Route path="/movie-overview/:movieId" exact component={MovieOverview} />
      <Route path="/search-results" exact component={MoviesSearch} />
      <Route path="/upcoming-movies" exact component={UpcomingMovies} />
      <Route path="/login" exact component={Login} />
      <Route component={notFoundPage} />
    </Switch>
  );
};

export default Routes;
