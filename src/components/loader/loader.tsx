import React from 'react'
import loader from '../../assets/loader-dotted.gif'
import styled from 'styled-components'

export interface LoaderProps {
  pendingState: boolean
}

const Loader = ({pendingState}: LoaderProps) => (
  <LoaderContainer>
    {pendingState && <MoviesLoader alt="loading icon" src={loader} />}
  </LoaderContainer>
)

export default Loader

const LoaderContainer = styled.div`
  margin: auto;
`

const MoviesLoader = styled.img`
  width: 75px;
  height: 100%;
`