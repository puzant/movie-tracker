import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import css from './App.css'
import DiscoverMovies from './components/DiscoverMovies'
import MovieOverview from './components/MovieOverview'
import SearchResults from './components/SearchResults'

class App extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }  

  state = {
    name: ''
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <Router>
         <div className="main-app-container">
           <div className="main-app-navbar">
             <div className="navigation-items">
               <li className="nav-item">
                 <Link to="/">Discover Movies</Link>
               </li>
             </div>
  
             <div className="movies-search-bar">
               <input onChange={this.handleChange} className="input-search-bar" type="text" placeholder="Enter Movie Name" />
               <Link to={{pathname: 'search-results', search:`?search=${this.state.name}`}}>
                <button className="btn-search">Search</button>
               </Link>
             </div>
           </div>
        
          <Switch>
            <Route path="/" exact component={DiscoverMovies} />
            <Route path="/movie-overview/:movieId" exact component={MovieOverview} />
            <Route path="/search-results/" exact component={SearchResults} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App