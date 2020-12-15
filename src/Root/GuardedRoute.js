import React from 'react'
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = (props) => {
  
  const {isAuth, component: Component, ...otherProps } = props

  return (
    <Route {...otherProps}
      render={(routeProps) => (isAuth ? <Component {...routeProps} /> : <Redirect to="/" /> )}
    />
  )

}

export default GuardedRoute