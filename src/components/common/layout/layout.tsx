import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Navbar from '../../header/header'

interface LayoutProps {
  children: ReactElement | ReactElement[]
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Root>
      <Navbar>
        {children}
      </Navbar>
    </Root>
  )
}

const Root = styled.div``