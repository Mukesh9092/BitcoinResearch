import React from 'react'
import { Link } from 'react-router-dom'

export const NavigationComponent = () => (
  <div>
    <Link to="/markets">Markets</Link>
    <Link to="/about">About</Link>
  </div>
)

export const Navigation = NavigationComponent
