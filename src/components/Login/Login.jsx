import React, { Component } from 'react';
import Info from '@material-ui/icons/Info'
import Constants from '../../constants/Constants'
import {bindActionCreators} from 'redux'
import * as actions from '../../redux/actions/actionCreators.js';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'

/** Login Styles Go Here */
const LoginContainer = styled.div`
padding: 10px;
margin: 40px auto;
width: 80%;
`

const LoginText = styled.div`
font-size: 1.5em;
font-weight: 600;
margin-bottom: 20px;
`

const NoticeText = styled.div`
line-height: 20px;
margin-bottom: 16px;
`

const LoginButtonContainer = styled.div`
display: flex;
justify-content: flex-star;
margin-top: 18px;
`

const LoginButton = styled.div`
border-color: #01b4e4;
background-color: #01b4e4;
color: #fff;
padding: .675rem .95rem;
border-radius: 5px;
font-weight: bold;
border-radius: 14px;
&:hover {
  cursor: pointer;
}
`

const CreateNewAccountLink = styled.a`
color: #00c6ff;
`

const LabelName = styled.div`
font-weight: bold;
margin-top: 15px;
`

const InputForm = styled.div`
display: flex;
flex-direction: column;
`

const StyledInput = styled.input`
margin-top: 10px;
border-color: rgba(33,37,41,0.15);
color: #292b2c;
padding: 12px;
border-radius: 1.25rem;
line-height: 1.5;
vertical-align: middle;
&:focus {
  outline: none;
}
`

const ErrorCardContainer = styled.div`
margin: 20px 0 10px 0;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
background-color: #fff;
border-radius: 8px;
border: 1px solid #ccc;
`

const ErrorCardHeader = styled.div`
background-color: #d53540;
color: #fff;
display: flex;
padding: 20px;
border-top-left-radius: 7px;
border-top-right-radius: 7px;
`

const ErrorText = styled.div`
font-weight: 600;
font-size: 1.2em;
line-height: 1.2em;
margin-left: 5px;
`

const ErrorTypeContainer = styled.div`
padding: 5px;
`

const StyledUnorderedList = styled.ul`
line-height: 1.4;
`

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleUsernameInput = this.handleUsernameInput.bind(this)
    this.handlePasswordInput = this.handlePasswordInput.bind(this)
    this.state = {
      username: null,
      password: null,
      validationErrorExsist: false,
      validationErrorText: null,
      isAuthenticated: this.props.isAuth
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

  login = () => {
    if((this.state.username == null || this.state.password == null)) {
      this.setState({validationErrorExsist: true}, () => {
         this.GetErrorText()
      })
    }
    else {
       this.props.loginUser(this.state.username, this.state.password)
    }
  }

  render() { 

    if(this.state.isAuthenticated) return <Redirect to='/' />
        
    const {validationErrorExsist} = this.state

    const ErrorStatusCard = () => (
      <ErrorCardContainer>
        <ErrorCardHeader>
          <Info />
          <ErrorText>There was a problem!</ErrorText>
        </ErrorCardHeader>
        <ErrorTypeContainer>
          <StyledUnorderedList>
            <li>{this.state.validationErrorText}</li>
            {/* TODO: login attemps */}
            {/* <li>You have 10 remaining login attempts.</li> */}
          </StyledUnorderedList>
        </ErrorTypeContainer>
      </ErrorCardContainer>
    )

    return ( 
      <LoginContainer>

        <LoginText>Login to your account</LoginText>
        <NoticeText>
          This app gets its data from the TMDD APIs. To view your account information, login with your TMDb credentials in the form below. To create one, 
           <CreateNewAccountLink href="https://www.themoviedb.org/signup" target="_blank"> Click here</CreateNewAccountLink>
        </NoticeText>

        {validationErrorExsist && <ErrorStatusCard />}

        <InputForm>
          <LabelName>Username</LabelName>
          <StyledInput onChange={this.handleUsernameInput} type="text"/>
        </InputForm>

        <InputForm>
          <LabelName>Password</LabelName>
          <StyledInput onChange={this.handlePasswordInput} type="password"/>
        </InputForm>

        <LoginButtonContainer>
          {/* <div className="login-btn" onClick={this.login}>Login</div> */}
          <LoginButton onClick={this.login}>Login</LoginButton>
        </LoginButtonContainer>

      </LoginContainer> 
    );
  }
}

const mapStateToProps = (state) => { 
  return {
    isAuth: state.isAuth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);
