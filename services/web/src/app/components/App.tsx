import Layout from './Layout'
import React, { FC } from 'react'

const App: FC = ({ children }) => {
  return (
    <div className='bp3-dark'>
      <Layout>{children}</Layout>
    </div>
  )
}

export default App
