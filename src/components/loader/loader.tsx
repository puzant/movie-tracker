import React from 'react'
import styled from 'styled-components'
import loader from 'assets/loader-dotted.gif'

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