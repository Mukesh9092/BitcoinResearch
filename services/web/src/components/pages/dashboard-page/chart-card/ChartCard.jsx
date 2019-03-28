import * as React from 'react'
import ContainerDimensions from 'react-container-dimensions'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import DeleteIcon from '@material-ui/icons/Delete'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap'
import { Button, Card, CardActions, CardHeader, CardMedia, TextField } from '@material-ui/core'

import ChartCardChart from '../chart-card-chart'

import * as styles from './styles.scss'

function FittedChart({ componentRef, chart }) {
  return (
    <ContainerDimensions>
      {({ width }) => {
        return <ChartCardChart chart={chart} width={(width > 0 && width) || 800} />
      }}
    </ContainerDimensions>
  )
}

@inject('store')
@observer
class ChartCardComponent extends React.Component {
  constructor(props) {
    super(props)

    const {
      chart: { from, to },
    } = props

    this.containerRef = React.createRef()

    this.state = {
      from: new Date(from),
      to: new Date(to),
    }
  }

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

  handleFromChange = ({ from }) => {
    this.setState({ from: new Date(from) })
  }

  handleToChange = ({ to }) => {
    this.setState({ to: new Date(to) })
  }

  render() {
    const {
      chart,
      chart: {
        marketStore: { quote, base },
      },
    } = this.props
    const { from, to } = this.state

    const title = base

    // Render Chart with properties from state
    chart.from = from
    chart.to = to

    return (
      <Card className={styles.chart} ref={this.containerRef}>
        <CardHeader title={title} />
        <CardMedia component={FittedChart} chart={chart} componentRef={this.containerRef} title={title} image="?" />
        <CardActions className={styles.cardActions}>
          <TextField
            id="from"
            label="From"
            type="datetime-local"
            defaultValue={from.toISOString().slice(0, -1)}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              const {
                target: { value },
              } = event

              this.handleFromChange({ from: value })
            }}
          />
          <TextField
            id="to"
            label="To"
            type="datetime-local"
            defaultValue={to.toISOString().slice(0, -1)}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              const {
                target: { value },
              } = event

              this.handleToChange({ to: value })
            }}
          />

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
        </CardActions>
      </Card>
    )
  }
}

export const ChartCard = withRouter(ChartCardComponent)
