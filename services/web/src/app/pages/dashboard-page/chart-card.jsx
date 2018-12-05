import * as React from 'react'
import { inject, observer } from 'mobx-react'

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { FitWidth } from '../../../../common/react/fit-width'
import { getUserWithDashboardWithChartsWithMarketByUserId } from '../../../../common/domain/queries/getUserWithDashboardWithChartsWithMarketByUserId'

import { ChartCardChart } from './chart-card-chart'
import * as styles from './styles.scss'

function FittedChart({ componentRef, chart }) {
  return (
    <FitWidth componentRef={componentRef}>
      {({ width }) => <ChartCardChart chart={chart} width={(width > 0 && width) || 800} />}
    </FitWidth>
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

  handleDeleteButtonClick = async ({ chartId }) => {
    const { dashboardStore } = this.props

    await dashboardStore.deleteChart({ chartId })
  }

  render() {
    const {
      chart,
      chart: {
        market: { quote, base },
      },
    } = this.props

    return (
      <Card className={styles.chart} ref={this.containerRef}>
        <CardMedia
          component={FittedChart}
          chart={chart}
          componentRef={this.containerRef}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {quote} / {base}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              this.handleDeleteButtonClick({ chartId: chart.id })
            }}
          >
            <DeleteIcon />
            Delete
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export const ChartCard = ChartCardComponent
