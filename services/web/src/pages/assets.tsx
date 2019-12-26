import { NonIdealState, Tab, Tabs } from '@blueprintjs/core'
import { groupBy } from 'lodash'
import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'
import App from '../components/App'
import AssetPanel from '../components/AssetPanel'
import SpinningLoader from '../components/SpinningLoader'

const Container = styled.main`
  margin-top: 50px;
  padding: 15px;

  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
`

const Page: NextPage = () => {
  const error = null
  const loading = true
  const values = []

  if (error) {
    return (
      <App>
        <NonIdealState title={error.name} description={error.message} />
      </App>
    )
  }

  if (loading) {
    return (
      <App>
        <SpinningLoader />
      </App>
    )
  }

  const groupedValues = groupBy(values, 'quote')

  return (
    <App>
      <Container>
        <h1>Assets</h1>

        <Tabs
          id='Tabs'
          // selectedTabId='BTC'
          animate={true}
          renderActiveTabPanelOnly={true}
          vertical={true}
        >
          {Object.keys(groupedValues).map((key) => {
            return (
              <Tab
                id={key}
                key={key}
                title={key}
                panel={<AssetPanel assets={groupedValues[key]} />}
              />
            )
          })}
        </Tabs>
      </Container>
    </App>
  )
}

export default Page