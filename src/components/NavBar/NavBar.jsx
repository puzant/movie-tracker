import React, { Component } from 'react';
import Routes from '../../root/routes'
import '../../assets/App.css'
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import Constants from '../../constants/Constants'
import MenuDrawer from './menuDrawer'
import styled from 'styled-components'

const NavigationItemsContinaer = styled.div`
  display: flex;
  justify-content: flex-start;
`
const MainAppContainer = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 10px;
  overflow: hidden;
  background: #00c6ff;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0072ff, #00c6ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-weight: bold;
`

const MainAppNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

class Navbar extends Component {

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
            <NavLink exact activeStyle={{fontWeight: "bold", color: "#133254"}} to={item.routePath}>
              <span>{item.icon}</span>
              <span>{item.navItemName}</span>
            </NavLink>
          </li>
        ))}

      </NavigationItemsContinaer>
    )

    return ( 
      <Router>
         <MainAppContainer>
           <MainAppNavbar>
             
             <NavItem />
             
              <div className="movies-search-bar">
                <input value={this.state.name} onChange={this.handleChange} className="input-search-bar" type="text" placeholder="Enter Movie Name" />
                <NavLink to={{pathname: 'search-results', search:`?search=${this.state.name}`}}>
                  <button disabled={this.state.name.length === 0} className="btn-search">Search</button>
                </NavLink>
              </div>       
             
           </MainAppNavbar>
         </MainAppContainer>

        <Routes />

      </Router>
     );
  }
}
 
export default Navbar;