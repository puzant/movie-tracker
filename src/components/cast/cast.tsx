import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import UnknowActorImage from '../../assets/unknown-actor.jpg'
import { Actor } from '../../api/Models'

export interface CastProps {
  actor: Actor
}

const Cast = ({actor}: CastProps) => {
  return (
    <Root elevation={3}>
      <ProfileImage
        image={actor.profile_path ? 
          `https://image.tmdb.org/t/p/w185/${actor.profile_path}` 
          : UnknowActorImage
        }
        title={actor.name}
      />
      <CardContent>
        <Typography variant="h6">{actor.name}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {actor.character}
        </Typography>
      </CardContent>
    </Root>
  );
}

export default Cast

const Root = styled(Card)`
  width: 155px;
  margin: 10px;
`

const ProfileImage = styled(CardMedia)`
  width: 155px;
  height: 235px; 
`