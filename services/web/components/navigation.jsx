import React from 'react'
import { Link } from 'react-router-dom'

// import * as styles from './navigation.scss'
//
// console.log('navigation styles', styles)

export const NavigationComponent = () => (
  // some change

  <div className="derp">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
  </div>
)

export const Navigation = NavigationComponent
