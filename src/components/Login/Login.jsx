import React, { Component } from 'react';
import './style.css'
import Info from '@material-ui/icons/Info'
import Constants from '../../constants/Constants'

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleUsernameInput = this.handleUsernameInput.bind(this)
    this.handlePasswordInput = this.handlePasswordInput.bind(this)
    this.state = {
      username: null,
      password: null,
      validationErrorExsist: false,
      validationErrorText: null
    }
  }

  GetErrorText = () => {
    //  username field is empty
    if(this.state.username == null) this.setState({ validationErrorText: Constants.VALIDATION_TEXT.EMPTY_USERNAME_FEILD })
    //  password field is empty
    else if(this.state.password == null) this.setState({ validationErrorText: Constants.VALIDATION_TEXT.EMPTY_PASSOWRD_FEILD })
  }

  handleUsernameInput = (event) => {
    this.setState({username: event.target.value})
  }
  
  handlePasswordInput = (event) => {
    this.setState({password: event.target.value})
  }

  validateUserInput = () => {
    if((this.state.username == null || this.state.password == null)) {
      this.setState({validationErrorExsist: true}, () => {
        this.GetErrorText()
      })
    }
  }

  render() { 
        
    const {validationErrorExsist} = this.state

    const ErrorStatusCard = () => (
      <div className="error-card-container">
        <div className="error-card-header">
          <Info />
          <div className="error-text">There was a problem!</div>
        </div>
        <div className="error-type-cont">
          <ul>
            <li>{this.state.validationErrorText}</li>
            {/* TODO: login attemps */}
            {/* <li>You have 10 remaining login attempts.</li> */}
          </ul>
        </div>
      </div>
    )

    return ( 
      <div className="login-container">

        <div className="login-text">Login to your account</div>
        <div className="notice-text">
          This app gets its data from the TMDD APIs. To view your account information, login with your TMDb credentials in the form below. To create one, 
           <a className="create-new-account-link" target="_blank" href="https://www.themoviedb.org/signup"> Click here</a>
        </div>

        {validationErrorExsist && <ErrorStatusCard />}

        <div className="input-form">
          <span className="label-name">Username</span>
          <input onChange={this.handleUsernameInput} type="text"/>
        </div>

        <div className="input-form">
          <span className="label-name">Password</span>
          <input onChange={this.handlePasswordInput} type="password"/>
        </div>

        <div className="login-btn-container">
          <div className="login-btn" onClick={this.validateUserInput}>Login</div>
        </div>

      </div> 
    );
  }
}
 
export default Login;
