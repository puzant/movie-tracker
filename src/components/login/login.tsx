import React from 'react'
import styled from 'styled-components'
import Alert from '@material-ui/lab/Alert'
import { bindActionCreators } from 'redux'
import authActions from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useHistory } from 'react-router-dom'

export interface LoginProps {
  loginUser: (username: string, password: string) => void
  success: boolean
  error: any
}

const schema = zod.object({
  username: zod
    .string()
    .nonempty({ message: 'Username is required' }),
  password: zod.string().nonempty({ message: 'Password is required' })
})


export const Login = ({loginUser, success, error}: LoginProps) => {
  
  const history = useHistory()
  const [usernameValue, setUsernameValue] = React.useState<string>('')
  const [passwordValue, setPasswordValue] = React.useState<string>('')
  const { register, handleSubmit, formState, errors } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })
  const { isValid } = formState

  React.useEffect(() => {
    if (success) history.push('/')
  }, [success, history])

  const handleUsernameValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(e.target.value)
  }

  const handlePasswordValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const handleUserLogin = async () => {
    await loginUser(usernameValue, passwordValue)
  }
  
  return (
    <Root>
      <LoginText>Login to your account</LoginText>
      <NoticeText>
        This app gets its data from the TMDD APIs.
        To view your account information, login with your TMDb
        credentials in the form below. To create one,
        <CreateNewAccountLink href="https://www.themoviedb.org/signup" target="_blank"> Click here</CreateNewAccountLink>
      </NoticeText>

      {error && <Alert severity="error">An error occured while trying to login</Alert>}

      <LoginForm onSubmit={handleSubmit(handleUserLogin)}>
        <InputForm>
          <LabelName>Username</LabelName>
          <StyledInput 
            name="username"
            onChange={handleUsernameValueChange} 
            type="text"
            ref={register({ required: true })}
          />
          {errors.username && <FormError>{errors.username.message}</FormError>}
        </InputForm>

        <InputForm>
          <LabelName>Password</LabelName>
          <StyledInput 
            name="password"
            onChange={handlePasswordValueChange} 
            type="password"
            ref={register({ required: true })}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </InputForm>

        <LoginButtonContainer>
          <LoginButton disabled={!isValid}>
            Login
          </LoginButton>
        </LoginButtonContainer>
      </LoginForm>
      
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

const LoginButton = styled.button<{
  disabled: boolean
}>`
  outline: none;
  border: none;
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
  &[disabled] {
    opacity: .3;
    cursor: not-allowed;
  }
`

const CreateNewAccountLink = styled.a`
  color: #00c6ff;
  text-decoration: none;
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
  border-radius: 5px;
  line-height: 1.5;
  vertical-align: middle;
&:focus {
  outline: none;
}
`

const LoginForm = styled.form``

const FormError = styled.span`
  font-size: 12px;
  color: #f04e4f;
  margin-top: 10px;
  font-weight: bold;
`

const mapStateToProps = (state: any) => { 
  return {
    success: state.auth.success,
    error: state.auth.error,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(authActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);