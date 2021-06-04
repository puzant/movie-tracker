import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Navbar from '../../navbar/navbar'
import { BrowserRouter as Router } from 'react-router-dom';

interface LayoutProps {
  children: ReactElement | ReactElement[]
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Root>
      <Router>
        <Navbar />
        {children}
      </Router>
    </Root>
  )
}

const Root = styled.div``