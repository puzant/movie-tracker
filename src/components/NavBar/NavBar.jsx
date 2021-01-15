import React, { Component } from 'react';
import Routes from '../../Root/Routes'
import '../../assets/App.css'
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import Constants from '../../constants/Constants'
import MenuDrawer from './MenuDrawer'
import styled from 'styled-components'

const NavigationItemsContinaer = styled.div`
  display: flex;
  justify-content: flex-start;
`

class NavBar extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: "",
      navItems: Constants.NAVBAR_ITEMS
    }
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  render() { 

    const { navItems } = this.state

    const NavItem = () => (
      <NavigationItemsContinaer>

        <div className="drawer-menu-btn">
          <MenuDrawer navItems={navItems} />
        </div>
        
        {navItems.map((item, index) => (
          !item.requireAuth && <li key={index} className="nav-item">
            <NavLink exact activeStyle={{fontWeight: "bold", color: "#82e0f5"}} to={item.routePath}>
              <span>{item.icon}</span>
              <span>{item.navItemName}</span>
            </NavLink>
          </li>
        ))}

      </NavigationItemsContinaer>
    )

    return ( 
      <Router>
         <div className="main-app-container">
           <div className="main-app-navbar">
             
             <NavItem />
             
              <div className="movies-search-bar">
                <input value={this.state.name} onChange={this.handleChange} className="input-search-bar" type="text" placeholder="Enter Movie Name" />
                <NavLink to={{pathname: 'search-results', search:`?search=${this.state.name}`}}>
                  <button disabled={this.state.name.length == 0} className="btn-search">Search</button>
                </NavLink>
              </div>       
             
           </div>
         </div>

        <Routes />

      </Router>
     );
  }
}
 
export default NavBar;