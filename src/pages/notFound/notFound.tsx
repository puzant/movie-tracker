import React from 'react'
import brokenImage from '../../assets/ambient-1.png'
import styled from 'styled-components'

export interface NotFoundProps {
  errorText: string
}

const NotFound = ({errorText}: NotFoundProps) => {
  return (
    <Root>
      <ErrorImage src={brokenImage} alt="" />
      <ErrorText>{errorText}</ErrorText>
  </Root>
  )
}

const Root = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ErrorImage = styled.img`
  width: 40vh;
  height: 40vh;
  margin-bottom: 24px;
`

const ErrorText = styled.div`
  font-weight: 500;
  font-size: 30px;
  text-align: center;
  color: #4ebdb6;
`

export default NotFound