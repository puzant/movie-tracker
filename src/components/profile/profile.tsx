import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import ProfileBackground from '../../assets/profile-background.svg'

export const Profile = () => {

  return (
    <Root>
      <OuterContainer>
        <AvatarContainer>
          <UserAvatar>P</UserAvatar>
          <Username>Puzant</Username>
        </AvatarContainer>
      </OuterContainer>
    </Root>
  )
}

const Root = styled.div`
`

const OuterContainer = styled.div`
  background-image: radial-gradient(at 30% top, #341a38 0%, rgba(3,37,65, 1) 70%);
`

const AvatarContainer = styled.div`
  background-image: url(${ProfileBackground});
  background-repeat: no-repeat;
  background-position: center -250px;
  padding: 40px;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const UserAvatar = styled(Avatar)`
  font-size: 40px !important;
  width: 88px !important;
  height: 88px !important;
  text-transform: uppercase;
  margin-right: 32px;
`

const Username = styled.div`
  font-size: 30px;
  font-weight: 500; 
`