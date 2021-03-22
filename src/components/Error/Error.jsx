import React from 'react'
import styled from 'styled-components'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

const Error = (props) => (
  props.error &&
  <ErrorContainer>
    <Alert severity="error">{props.errorText}</Alert>
  </ErrorContainer> 
)

export default Error

const ErrorContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
`