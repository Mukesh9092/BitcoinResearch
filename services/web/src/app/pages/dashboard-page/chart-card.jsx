import * as React from 'react'
import ContainerDimensions from 'react-container-dimensions'
import { inject, observer } from 'mobx-react'

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { ChartCardChart } from './chart-card-chart'
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
