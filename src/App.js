import React from 'react'
import { Layout } from './components/common/layout/layout'
import Routes from './routes/routes'

export const App = () => {
  return (
    <>
      <Layout>
        <Routes />
      </Layout>
    </>
  );
}

