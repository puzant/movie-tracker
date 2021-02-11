import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components'
import utils from '../../utils/utils' 

const MovieReviews = ({reviews}) => {

  const randomColor = utils.generateRandomColorValue()
  const [hidden, setVisibility] = useState(true)

  return (
    <RootContainer>

      <MovieReviewsTitle>Movie Reviews</MovieReviewsTitle>

      {reviews.length === 0 &&
          <NoMovieReviewText>
            There are no reviews for this movie
          </NoMovieReviewText>
      }

      <MovieReviewContainer>
      {
        reviews.map((r) => (
          <ReviewBox key={r.id}>
            <UserContainer>
              <UserAvatar randomColor={randomColor}>{r.author[0]}</UserAvatar>
              <UserName>{r.author}</UserName>
            </UserContainer>
            <ReviewContent>
              <>
                {hidden ? `${r.content.substr(0, 250).trim()} ...` : r.content}
                {
                hidden ? 
                  <ShowMoreBtn onClick={() => setVisibility(false)}>read more</ShowMoreBtn>
                  :
                  <ShowMoreBtn onClick={() => setVisibility(true)}>read less</ShowMoreBtn>
                }
              </>
            </ReviewContent>
          </ReviewBox>
        ))
      }
      </MovieReviewContainer>

    </RootContainer>
  )
}

MovieReviews.propTypes = {
  movieReviews: PropTypes.array
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 83%;
`

const MovieReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: auto;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  padding: 20px;
  margin: 10px auto 10px 0;
  background-color: #fafafa;
`

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const UserName = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
`

const UserAvatar = styled(Avatar)`
  background-color: ${props =>  '#' + props.randomColor + '!important'};
`

const ShowMoreBtn = styled.a`
  color: #4ebdb6;
  text-decoration: underLine;
  cursor: pointer;
`

const ReviewContent = styled.div`
  margin-top: 10px;
  line-height: 25px;
`

const MovieReviewsTitle = styled.div`
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 14px;
  align-self: center;
  text-align: center;
`

const NoMovieReviewText = styled.span`
  text-align: center;
  font-size: 20px;
`

export default MovieReviews