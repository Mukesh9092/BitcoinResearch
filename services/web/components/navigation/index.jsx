import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'emotion'

// import * as styles from './navigation.css'
//
// console.log('navigation styles', styles)

const containerClassName = css`
  background-color: #00ff00;
`

const linkClassName = css`
  display: block;
  background-color: #0000ff;
`

export const NavigationComponent = () => (
  // some change

  <div className={containerClassName}>
    <Link className={linkClassName} to="/">
      Home
    </Link>
    <Link className={linkClassName} to="/about">
      About
    </Link>
  </div>
)

export const Navigation = NavigationComponent
