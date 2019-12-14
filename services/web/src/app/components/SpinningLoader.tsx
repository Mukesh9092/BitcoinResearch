import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@blueprintjs/core'

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SpinningLoader = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  )
}

export default SpinningLoader
