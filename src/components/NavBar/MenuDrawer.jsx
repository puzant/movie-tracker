import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from "react-router-dom";
import menuIcon from '../../assets/menu-icon.jpg'
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuIcon: {
    height: '40px'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 2,
    minHeight: 64,
  },
});

export default function MenuDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const DrawerList = (props) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(props.anchor, false)}
      onKeyDown={toggleDrawer(props.anchor, false)}
      >
        <div className={classes.drawerHeader}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </div>
      <Divider />
      <List>
        {props.navItems.map((item, index) => (
          !item.requireAuth &&
          <NavLink key={index} exact activeStyle={{fontWeight: "bold", color: "#00c6ff"}} to={item.routePath}>
            <MenuItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.navItemName} />
            </MenuItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <img className={classes.menuIcon} src={menuIcon} alt="icon" />
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <DrawerList anchor={anchor} navItems={props.navItems} />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
