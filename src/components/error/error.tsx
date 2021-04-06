import React from 'react'
import styled from 'styled-components'
import MuiAlert from '@material-ui/lab/Alert'

export interface ErrorProps {
  error: boolean
  errorText: string
}

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

const Error = ({
  error,
  errorText
}: ErrorProps) => (
  <ErrorContainer>
    {error && <Alert severity="error">{errorText}</Alert>}
  </ErrorContainer> 
)

export default Error

const ErrorContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
`