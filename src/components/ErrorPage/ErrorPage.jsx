import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import brokenImage from '../../assets/ambient-1.png'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '40vh',
    height: '40vh',
    marginBottom: theme.spacing(3),
  },
  errorText: {
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: 'center',
    color: '#4ebdb6'
  },
}))


const ErrorPage = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.image} src={brokenImage} alt=""/>
      <Typography className={classes.errorText} color="primary" variant="h4">
        {props.errorText}
      </Typography>
  </div>
  )
}

export default ErrorPage