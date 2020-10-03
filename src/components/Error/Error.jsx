import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

const Error = (props) => (
  props.error &&
  <div className="movies-error">
    <Alert severity="error">{props.errorText}</Alert>
  </div> 
)

export default Error