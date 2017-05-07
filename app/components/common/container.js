import React from 'react'
import { Container as ReactStrapContainer } from 'reactstrap'

export function Container({ children }) {
  return (
    <ReactStrapContainer
      style={{
        marginTop: 20,
        marginBottom: 20,
      }}
      fluid
    >
      {children}
    </ReactStrapContainer>
  )
}
