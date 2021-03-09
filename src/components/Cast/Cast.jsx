import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import UnknowActorImage from '../../assets/unknown-actor.jpg'

const useStyles = makeStyles({
  root: {
    width: '155px',
    margin: '10px'
  },
  profileMedia: {
    width: 155,
    height: 235,
  }
});

const Cast = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <CardMedia
        className={classes.profileMedia}
        image={props.actor.profile_path ? 
              `https://image.tmdb.org/t/p/w185/${props.actor.profile_path}` 
            : UnknowActorImage
          }
        title={props.actor.name}
      />
        <CardContent>
          <Typography variant="h6">{props.actor.name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.actor.character}
          </Typography>
        </CardContent>
      </Card>
  );
}

export default Cast