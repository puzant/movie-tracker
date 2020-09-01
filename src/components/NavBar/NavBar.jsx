import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import '../../assets/App.css'
import DiscoverMovies from '../DiscoverMovies/DiscoverMovies'
import MovieOverview from '../MoviesOverview/MoviesOverview'
import SearchResults from '../SearchResults/SearchResults'
class NavBar extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: ""
    }
  }  

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  render() { 

    const NavItem = () => (
      <div className="navigation-items">
        <li className="nav-item">
        <Link to="/">Discover Movies</Link>
        </li>

        <li className="nav-item">
          <Link to="/upcoming-movies">Upcoming Movies</Link>
        </li>
      </div>
    )

    return ( 
      <Router>
         <div className="main-app-container">
           <div className="main-app-navbar">

             <NavItem /> 
  
             <div className="movies-search-bar">
               <input value={this.state.name} onChange={this.handleChange} className="input-search-bar" type="text" placeholder="Enter Movie Name" />
               <Link to={{pathname: 'search-results', search:`?search=${this.state.name}`}}>
                <button className="btn-search">Search</button>
               </Link>
             </div>
           </div>
        
          <Switch>
            <Route path="/" exact component={DiscoverMovies} />
            <Route path="/movie-overview/:movieId" exact component={MovieOverview} />
            <Route path="/search-results/" exact component={SearchResults} />
            {/* Anything that dosen't match the above routes, redirect to / */}
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
     );
  }
}
 
export default NavBar;