import React, { Component } from 'react';
import Routes from '../../Root/Routes'
import '../../assets/App.css'
import { NavLink, BrowserRouter as Router } from "react-router-dom";

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

  render() { 

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

    return ( 
      <Router>
         <div className="main-app-container">
           <div className="main-app-navbar">

             <NavItem /> 
  
              {
               window.location.pathname == '/' &&
                <div className="movies-search-bar">
                  <input value={this.state.name} onChange={this.handleChange} className="input-search-bar" type="text" placeholder="Enter Movie Name" />
                  <NavLink to={{pathname: 'search-results', search:`?search=${this.state.name}`}}>
                    <button onClick={this.resetState} className="btn-search">Search</button>
                  </NavLink>
                </div>
              }            
             
           </div>
         </div>

        <Routes />

      </Router>
     );
  }
}
 
export default NavBar;