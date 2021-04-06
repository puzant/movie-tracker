import React from 'react'
import styled from 'styled-components'
import Alert from '@material-ui/lab/Alert'
import { bindActionCreators } from 'redux'
import loginActions from '../../redux/actions/loginActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export interface LoginProps {
  loginUser: (username: string, password: string) => void
  loginSuccess: boolean
  loginError: boolean
}

export const Login = ({loginUser, loginSuccess, loginError}: LoginProps) => {

  const [usernameValue, setUsernameValue] = React.useState<string>('')
  const [passwordValue, setPasswordValue] = React.useState<string>('')

  const handleUsernameValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(e.target.value)
  }

  const handlePasswordValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const handleUserLogin = () => {
    loginUser(usernameValue, passwordValue)
  }

  return (
    <Root>

      { loginSuccess && <Redirect to='/' /> }

      <LoginText>Login to your account</LoginText>
      <NoticeText>
        This app gets its data from the TMDD APIs. To view your account information, login with your TMDb credentials in the form below. To create one, 
        <CreateNewAccountLink href="https://www.themoviedb.org/signup" target="_blank"> Click here</CreateNewAccountLink>
      </NoticeText>

      {loginError && <Alert severity="error">Username & Password are required</Alert>}

      <InputForm>
        <LabelName>Username</LabelName>
        <StyledInput onChange={handleUsernameValueChange} type="text"/>
      </InputForm>

      <InputForm>
        <LabelName>Password</LabelName>
        <StyledInput onChange={handlePasswordValueChange} type="password"/>
      </InputForm>

      <LoginButtonContainer>
        <LoginButton onClick={handleUserLogin}>Login</LoginButton>
      </LoginButtonContainer>

    </Root>
  )

}

const Root = styled.div`
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
  border: 1px solid #abb3ba;
  color: #292b2c;
  padding: 12px;
  border-radius: 1.25rem;
  line-height: 1.5;
  vertical-align: middle;
&:focus {
  outline: none;
}
`

const mapStateToProps = (state: any) => { 
  return {
    loginSuccess: false,
    loginError: false,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(loginActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);