import React, { useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import authActions from '../../redux/actions/authActions'
import Routes from '../../root/routes'
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import Constants from '../../constants/Constants'
import MenuDrawer from './menuDrawer'
import { Block } from '../layout/block/block'
import MeetingRoom from '@material-ui/icons/MeetingRoom'

interface NavigationLink {
  navItemName: string 
  routePath: string 
  icon: ReactNode 
}

interface NavbarProps {
  isAuthenticated: boolean
  logout: () => void
}

export const Navbar = ({ isAuthenticated, logout }: NavbarProps) => {

  const accountId = localStorage.getItem('accountId')
  const [searchValue, setSearchValue] = React.useState<string>("")
  const [navigationLinks, setNavigationLinks] = React.useState<NavigationLink[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (accountId) {
      let authenticatedUserFilteredLinks = Constants.NAVBAR_ITEMS.filter(
        link => link.navItemName !== 'Login'
      )
      return setNavigationLinks(authenticatedUserFilteredLinks)
    }
    let filteredLinks = Constants.NAVBAR_ITEMS.filter(
      link => link.navItemName !== 'Profile'
    )
    return setNavigationLinks(filteredLinks)
  }, [isAuthenticated])

  const NavItems = () => (
    <Block layout='horizontal'>
      <DrawerMenuuContainer>
        <MenuDrawer navItems={navigationLinks} />
      </DrawerMenuuContainer>
      
      {navigationLinks.map((link: NavigationLink, index: number) => (
        <StyledLink 
          key={index} 
          exact
          activeStyle={{fontWeight: "bold", color: "#133254"}} 
          to={link.routePath}
        >
          <span>{link.icon}</span>
          <span>{link.navItemName}</span>
        </StyledLink>
      ))}
      {accountId && 
        <LogoutButton onClick={ () => logout() }>
          <span><MeetingRoom /></span>
          <span>Logout</span>
        </LogoutButton>}
    </Block>
  )

  return (
    <Router>
      <MainContainer 
        layout='horizontal' 
        justify='space-between' 
        align='center'
      >
        <NavItems />
        <Block layout='horizontal'>
          <SearchBar 
            value={searchValue} 
            onChange={handleChange}
            type='text' 
            placeholder='Enter Movie Name' 
          />
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
  @media (max-width: 768px) {
    display: inline;
    cursor: pointer;
  }
`

const SearchBar = styled.input`
  background: #f8fcfe;
  box-shadow: 0 0 3px #fff inset;
  color: #111;
  padding: 1em;
  border: 1px solid #fff;
  border-radius: 5px;
  margin-right: 6px;
  width: 220px;
  transition: .5s;
  opacity: .5;
  &:focus {
    outline: none;
    opacity: 1;
  }
  &::placeholder {
    color: #111;
  }
  @media (max-width: 768px) {
    
  }
`

const SearchButton = styled.button`
  font-weight: bold;
  background: #f8fcfe;
  color: #111;
  padding: 1em;
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
  @media (max-width: 768px) {
    display: none;
  }
`

const LogoutButton = styled.div`
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
  @media (max-width: 768px) {
    display: none;
  }
`

const mapStateToProps = (state: any) => { 
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(authActions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);