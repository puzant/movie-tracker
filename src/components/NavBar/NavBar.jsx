import React, { useEffect } from 'react'
import styled from 'styled-components'
import Routes from '../../root/routes'
import '../../assets/App.css'
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import Constants from '../../constants/Constants'
import MenuDrawer from './menuDrawer'

export const Navbar = () => {

  const [name, setName] = React.useState("")
  const [navItems, setNavItems] = React.useState([])

  const handleChange = (e) => {
    setName(e.target.value)
  }

  useEffect(() => {
    setNavItems(Constants.NAVBAR_ITEMS)
  }, [name, navItems])

  const NavItem = () => (
    <NavigationItemsContinaer>

      <DrawerMenuuContainer>
        <MenuDrawer navItems={navItems} />
      </DrawerMenuuContainer>
      
      {navItems.map((item, index) => (
        !item.requireAuth &&
            <StyledLink key={index} exact activeStyle={{fontWeight: "bold", color: "#133254"}} to={item.routePath}>
              <span>{item.icon}</span>
              <span>{item.navItemName}</span>
            </StyledLink>
      ))}

    </NavigationItemsContinaer>
  )

  return (
    <Router>
      <MainAppContainer>
        <MainAppNavbar>
             
          <NavItem />
             
            <MoviesSearchBarContainer>
              <SearchBar value={name} onChange={handleChange} type="text" placeholder="Enter Movie Name" />
              <NavLink to={{pathname: 'search-results', search:`?search=${name}`}}>
                <SearchButton disabled={name.length === 0}>Search</SearchButton>
              </NavLink>
            </MoviesSearchBarContainer>       
             
        </MainAppNavbar>
      </MainAppContainer>

      <Routes />

    </Router>
  )

}

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

const DrawerMenuuContainer = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: inline;
    cursor: pointer;
  }
`

const SearchBar = styled.input`
  background: #f8fcfe;
  border-radius: 1px;
  box-shadow: 0 0 3px #fff inset;
  color: #111;
  padding: 12px 10px;
  width: 225px;
  border: 1px solid #fff;
  border-radius: 5px;
  margin-right: 6px;
  transition: .5s;
  opacity: .5;
  &:focus {
    outline: none;
    opacity: 1;
  }
  &::placeholder {
    color: #111;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`

const MoviesSearchBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30%;
  align-items: center;
  @media (max-width: 600px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`

const SearchButton = styled.button`
  font-weight: bold;
  background: #f8fcfe;
  color: #111;
  padding: 12px;
  border: 1px solid #fff;
  border-radius: 5px;
  transition: .5s;
  &:disabled {
    opacity: 0.5;
    cursor: default !important;
  }
  &:hover {
    cursor: pointer;
  }
`

const StyledLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  color: #fff;
  text-align: center;
  padding: 2px 16px;
  text-decoration: none;
  transition: 0.5s;
  &:hover:not(.active) {
    background-color: #e5eaf5;
    border-radius: 10px;
    color: #111;
  }
  @media (max-width: 600px) {
    display: none;
  }
`