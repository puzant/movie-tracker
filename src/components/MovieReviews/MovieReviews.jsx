import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';

const randomColor = Math.floor(Math.random()*16777215).toString(16);

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 'auto',
    width: '83%'
  },
  reviewBox: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    width: 'auto',
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    padding: '20px',
    margin: '10px auto',
    backgroundColor: '#fafafa'
  },
  userNameAvatarCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    backgroundColor: '#'+randomColor,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginLeft: '10px'
  },
  userReviewCont: {
    marginTop: '10px',
    lineHeight: '25px'
  },
  moviesReviewCont: {
    display: 'flex',
    justifyContent: 'flexStart',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  moviesReviewText: {
    fontSize: '24px',
    marginTop: '20px',
    marginBottom: '14px',
    alignSelf: 'flex-start'
  },
  noReviewsText: {
    textAlign: 'left',
    fontSize: '20px'
  },
  showMoreBtn: {
    color: '#4ebdb6',
    textDecoration: 'underLine',
    cursor: 'pointer'
  }
}))

const MovieReviews = (props = {}) => {

  const classes = useStyles()
  const [hidden, setVisibility] = useState(true)

  return (
    <div className={classes.rootContainer}>

      <div className={classes.moviesReviewText}>Movie Reviews</div>

      {props.reviews.length == 0 &&
          <span className={classes.noReviewsText}>
            There are no reviews for this movie
          </span>
      }

      <div className={classes.moviesReviewCont}>
      {
        props.reviews.map((r) => (
          <div key={r.id} className={classes.reviewBox}>
            <div className={classes.userNameAvatarCont}>
              <Avatar className={classes.userAvatar}>{r.author[0]}</Avatar>
              <div className={classes.userName}>{r.author}</div>
            </div>
            <div className={classes.userReviewCont}>
              <>
                {hidden ? `${r.content.substr(0, 250).trim()} ...` : r.content}
                {
                hidden ? 
                  <a className={classes.showMoreBtn} onClick={() => setVisibility(false)}>read more</a>
                  :
                  <a className={classes.showMoreBtn} onClick={() => setVisibility(true)}>read less</a>
                }
              </>
            </div>
          </div>
        ))
      }
      </div>

    </div>
  )
}

MovieReviews.propTypes = {
  moviesReviews: PropTypes.array
}

export default MovieReviews