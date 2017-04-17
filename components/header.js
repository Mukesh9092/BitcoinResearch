import React from 'react'
import Link from 'next/link'

export default () => (
  <header>
    <nav>
      <Link href='/'><a>Home</a></Link> | <Link href='/useragent'><a>UserAgent</a></Link>
    </nav>
  </header>
)
