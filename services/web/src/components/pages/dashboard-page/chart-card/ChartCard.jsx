import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import DeleteIcon from '@material-ui/icons/Delete'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap'
import { Button, Card, CardActions, CardHeader, CardMedia, TextField } from '@material-ui/core'

import ChartCardChart from '../chart-card-chart'

import * as styles from './styles.scss'

@inject('store')
@observer
class ChartCardComponent extends React.Component {
  handleFullScreenButtonClick = ({ chartId }) => {
    const { history } = this.props

    history.push(`/chart/${chartId}`)
  }

  handleDeleteButtonClick = async ({ chartId }) => {
    const {
      store: { dashboardStore },
    } = this.props

    await dashboardStore.deleteChart({ chartId })
  }

  renderFrom() {
    const { chart } = this.props

    return (
      <TextField
        id="from"
        label="From"
        type="datetime-local"
        defaultValue={chart.from.slice(0, -1)}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => {
          // TODO: Make this an action. The prop should change on the Chart in
          //       the Database.
          const {
            target: { value },
          } = event
        }}
      />
    )
  }

  renderTo() {
    const { chart } = this.props

    return (
      <TextField
        id="to"
        label="To"
        type="datetime-local"
        defaultValue={chart.to.slice(0, -1)}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => {
          // TODO: Make this an action. The prop should change on the Chart in
          //       the Database.
          const {
            target: { value },
          } = event
        }}
      />
    )
  }

  renderFullScreenButton() {
    const { chart } = this.props

    return (
      <Button
        size="small"
        color="primary"
        onClick={() => {
          this.handleFullScreenButtonClick({ chartId: chart.id })
        }}
      >
        <ZoomOutMapIcon />
        Full Screen
      </Button>
    )
  }

  renderDeleteButton() {
    const { chart } = this.props

    return (
      <Button
        size="small"
        color="secondary"
        onClick={() => {
          this.handleDeleteButtonClick({ chartId: chart.id })
        }}
      >
        <DeleteIcon />
        Remove
      </Button>
    )
  }

  render() {
    const {
      chart,
      chart: {
        marketStore: { quote, base },
      },
    } = this.props

    const title = base

    return (
      <Card className={styles.chart}>
        <CardHeader title={title} />
        <CardMedia component={ChartCardChart} chart={chart} title={title} image="?" />
        <CardActions className={styles.cardActions}>
          {this.renderFrom()}
          {this.renderTo()}
          {this.renderFullScreenButton()}
          {this.renderDeleteButton()}
        </CardActions>
      </Card>
    )
  }
}

export const ChartCard = withRouter(ChartCardComponent)
