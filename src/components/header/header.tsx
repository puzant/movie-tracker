import React, { useEffect, ReactNode, ReactElement } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import authActions from '../../redux/actions/authActions'
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import Constants from '../../constants/Constants'
import { MenuDrawer } from './menuDrawer'
import { Block } from '../common/block/block'
import MeetingRoom from '@material-ui/icons/MeetingRoom'
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f8fcfe',
    opacity: .5,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
}));

interface NavigationLink {
  navItemName: string 
  routePath: string 
  icon: ReactNode 
}

interface HeaderProps {
  isAuthenticated: boolean
  logout: () => void
  children: ReactElement | ReactElement[]
}

export const Header = ({ isAuthenticated, logout, children }: HeaderProps) => {

  const classes = useStyles()

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
        <Block layout='horizontal' gap={10} align='center'>
          <div className={classes.root}>
            <div className={classes.searchIcon}>
            <SearchIcon />
            </div>
            <InputBase
              onChange={handleChange}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <NavLink to={{pathname: 'search-results', search:`?search=${searchValue}`}}>
            <SearchButton disabled={!searchValue.length}>Search</SearchButton>
          </NavLink>
        </Block>
      </MainContainer>
      {children}
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
`

const SearchButton = styled.button`
  font-weight: bold;
  background: #f8fcfe;
  color: #111;
  padding: 9px;
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


export default connect(mapStateToProps, mapDispatchToProps)(Header);