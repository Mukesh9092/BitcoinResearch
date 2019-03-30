import * as React from 'react'
import ContainerDimensions from 'react-container-dimensions'
import Grid from '@material-ui/core/Grid'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import Page from '../../page/index'

import * as styles from './styles.scss'

function FittedChart({ chart }) {
  return (
    <ContainerDimensions>
      {({ width }) => {
        return <FullScreenChart chart={chart} width={(width > 0 && width) || 800} />
      }}
    </ContainerDimensions>
  )
}

@withRouter
@inject('store')
@observer
class ChartPageComponent extends React.Component {
  render() {
    return (
      <Page>
        <Grid item xs={12}>
          <h1>EHRMAGERHDZ</h1>
        </Grid>
      </Page>
    )
  }
}

export const ChartPage = ChartPageComponent
