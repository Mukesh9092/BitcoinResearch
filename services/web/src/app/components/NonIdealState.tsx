import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NonIdealState = () => {
  return <Container>No data</Container>
}

export default NonIdealState
