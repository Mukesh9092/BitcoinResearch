import * as React from 'react'
import ContainerDimensions from 'react-container-dimensions'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap'

import { ChartCardChart } from '../chart-card-chart'

import * as styles from './styles.scss'

function FittedChart({ componentRef, chart }) {
  return (
    <ContainerDimensions>
      {({ width }) => <ChartCardChart chart={chart} width={(width > 0 && width) || 800} />}
    </ContainerDimensions>
  )
}

@inject('applicationStore')
@inject('dashboardStore')
@observer
class ChartCardComponent extends React.Component {
  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }

  handleFullScreenButtonClick = ({ chartId }) => {
    this.props.history.push(`/chart/${chartId}`)
  }

  handleDeleteButtonClick = async ({ chartId }) => {
    await this.props.dashboardStore.deleteChart({ chartId })
  }

  render() {
    const {
      chart,
      chart: {
        market: { quote, base },
      },
    } = this.props

    const title = `${quote} / ${base}`

    return (
      <Card className={styles.chart} ref={this.containerRef}>
        <CardHeader title={title} />
        <CardMedia
          component={FittedChart}
          chart={chart}
          componentRef={this.containerRef}
          title={title}
        />
        <CardActions className={styles.cardActions}>
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