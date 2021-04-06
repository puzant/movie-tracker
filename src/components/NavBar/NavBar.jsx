import React, { useEffect } from 'react'
import styled from 'styled-components'
import Routes from '../../root/routes'
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import Constants from '../../constants/Constants'
import MenuDrawer from './menuDrawer'
import { Block } from '../layout/block/block'

export const Navbar = () => {

  const [searchValue, setSearchValue] = React.useState("")
  const [navigationLinks, setNavigationLinks] = React.useState([])

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    setNavigationLinks(Constants.NAVBAR_ITEMS)
  }, [searchValue, navigationLinks])

  const NavItems = () => (
    <Block layout='horizontal'>
      <DrawerMenuuContainer>
        <MenuDrawer navItems={navigationLinks} />
      </DrawerMenuuContainer>
      
      {navigationLinks.map((link, index) => (
        !link.requireAuth &&
          <StyledLink key={index} exact activeStyle={{fontWeight: "bold", color: "#133254"}} to={link.routePath}>
            <span>{link.icon}</span>
            <span>{link.navItemName}</span>
          </StyledLink>
      ))}
    </Block>
  )

  return (
    <Router>
      <MainContainer layout='horizontal' justify='space-between' align='center'>
        <NavItems />
        <Block layout='horizontal'>
          <SearchBar value={searchValue} onChange={handleChange} type='text' placeholder='Enter Movie Name' />
          <NavLink to={{pathname: 'search-results', search:`?search=${searchValue}`}}>
            <SearchButton disabled={!searchValue.length}>Search</SearchButton>
          </NavLink>
        </Block>
      </MainContainer>
      <Routes />
    </Router>
  )

}

const MainContainer = styled(Block)`
  list-style-type: none;
  padding: 10px;
  background: #00c6ff;
  background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
  background: linear-gradient(to right, #0072ff, #00c6ff);
  font-weight: bold;
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
  box-shadow: 0 0 3px #fff inset;
  color: #111;
  padding: 12px 10px;
  border: 1px solid #fff;
  border-radius: 20px;
  margin-right: 6px;
  min-width: 220px;
  width: 100%;
  transition: .5s;
  opacity: .5;
  &:focus {
    outline: none;
    opacity: 1;
  }
  &::placeholder {
    color: #111;
  }
`

const SearchButton = styled.button`
  font-weight: bold;
  background: #f8fcfe;
  color: #111;
  padding: 12px;
  border: 1px solid #fff;
  border-radius: 20px;
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