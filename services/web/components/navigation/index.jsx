import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'emotion'

// import * as styles from './navigation.css'
//
// console.log('navigation styles', styles)

const containerClassName = css``
const linkClassName = css``

export const NavigationComponent = () => (
  // some change

  <div className={containerClassName}>
    <Link className={linkClassName} to="/markets">
      Markets
    </Link>
    <Link className={linkClassName} to="/about">
      About
    </Link>
  </div>
)

export const Navigation = NavigationComponent
