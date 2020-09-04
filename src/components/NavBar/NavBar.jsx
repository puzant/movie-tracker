import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import '../../assets/App.css'
import DiscoverMovies from '../DiscoverMovies/DiscoverMovies'
import MovieOverview from '../MoviesOverview/MoviesOverview'
import SearchResults from '../SearchResults/SearchResults'
import UpcomingMovies from '../UpcomingMovies/UpcomingMovies'
import ErrorPage from '../ErrorPage/ErrorPage'

class NavBar extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this)
    this.state = {
      name: "",
    }
  } 

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  resetState() {
    this.setState({ name: "" })
  }

  shouldRednerSearchBar() {
    
  }

  render() { 

    const { shouldRender } = this.state

    const notFoundPage = () => <ErrorPage errorText="Page Not Found"/>

    const NavItem = () => (
      <div className="navigation-items">
        <li className="nav-item">
        <NavLink exact activeStyle={{ fontWeight: "bold", color: "#111"}} to="/">Discover Movies</NavLink>
        </li>

        <li className="nav-item">
          <NavLink exact activeStyle={{fontWeight: "bold", color: "#111"}} to="/upcoming-movies">Upcoming Movies</NavLink>
        </li>
      </div>
    )

    const Login = () => (
      <div className="login-container">
        <span>Login</span>
      </div>
    )

    return ( 
      <Router>
         <div className="main-app-container">
           <div className="main-app-navbar">

             <NavItem /> 
  
             <div className="sub-container">
              {
               window.location.pathname == '/' ?
                <div className="movies-search-bar">
                  <input value={this.state.name} onChange={this.handleChange} className="input-search-bar" type="text" placeholder="Enter Movie Name" />
                  <NavLink to={{pathname: 'search-results', search:`?search=${this.state.name}`}}>
                    <button onClick={this.resetState} className="btn-search">Search</button>
                  </NavLink>
                </div>
                : 
                null
              }

             {/* <Login /> */}
             
             </div>
             
           </div>
        
          <Switch>
            <Route path="/" exact component={DiscoverMovies} />
            <Route path="/movie-overview/:movieId" exact component={MovieOverview} />
            <Route path="/search-results" exact component={SearchResults} />
            <Route path="/upcoming-movies" exact component={UpcomingMovies} />
            <Route component={notFoundPage} />
          </Switch>
        </div>
      </Router>
     );
  }
}
 
export default NavBar;