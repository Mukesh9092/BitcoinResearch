import '../../../node_modules/normalize.css/normalize.css'
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css'
import '../../../node_modules/@blueprintjs/table/lib/css/table.css'

import React from 'react'
import NavBar from './NavBar'

export interface LayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar heading='SmallCrypto' />
      {children}
    </>
  )
}

export default Layout
