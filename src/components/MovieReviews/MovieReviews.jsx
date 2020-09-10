import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

const randomColor = Math.floor(Math.random()*16777215).toString(16);

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  reviewBox: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    width: '600px',
    boxShadow: '-2px 4px 30px -1px rgba(0,0,0,0.75)',
    padding: '20px',
    margin: '10px'
  },
  userNameAvatarCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#'+randomColor,
    borderRadius: '50%',
    color: '#fff',
    width: '32px',
    height: '32px',
    textTransform: 'uppercase'
  },
  userName: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginLeft: '10px',
  },
  userReviewCont: {
    marginTop: '10px',
    lineHeight: '25px'
  },
  moviesReviewCont: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  moviesReviewText: {
    fontWeight: 'bold',
    fontSize: '24px',
    marginTop: '20px',
    marginBottom: '14px',
    textAlign: 'center',
  },
  noReviewsText: {
    textAlign: 'center',
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
              <div className={classes.userAvatar}>{r.author[0]}</div>
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