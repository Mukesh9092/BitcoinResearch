import * as React from 'react'
import { Mutation } from 'react-apollo'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { FitWidth } from '../../../../common/react/fit-width'
import { IApolloMutationResult } from '../../../../common/apollo/types/IApolloMutationResult'
import { IChart } from '../../../../common/domain/types/IChart'
import { deleteChart } from '../../../../common/domain/mutations/deleteChart'
import {
  getUserWithDashboardWithChartsWithMarketByUserId,
} from '../../../../common/domain/queries/getUserWithDashboardWithChartsWithMarketByUserId'

import { ChartCardChart } from './chart-card-chart'
import * as styles from './styles.scss'

interface IFittedChartProps<T> {
  componentRef: React.Ref<T>
  chart: IChart
}

export class FittedChart<T> extends React.Component<IFittedChartProps<T>> {
  public render (): React.ReactElement<ChartCardChart> {
    return (
      <FitWidth componentRef={this.props.componentRef}>
        {({ width }: { width: number }) => {
          return (
            <ChartCardChart chart={this.props.chart} width={width > 0 && width || 800} />
          )
        }}
      </FitWidth>
    )
  }
}

interface IChartCardProps {
  userId: string
  chart: IChart
}

export class ChartCard extends React.Component<IChartCardProps> {
  public constructor (props: IChartCardProps) {
    super(props)

    this.containerRef = React.createRef<Card>()
  }

  public containerRef: React.RefObject<Card>

  public handleDeleteCompleted() {

  }

  public render (): React.ReactElement<Card> {
    const {
      chart,
      chart: {
        market: {
          quote,
          base,
        },
      },
    } = this.props

    return (
      <Mutation mutation={deleteChart}>
        {(deleteChartMutate: Function, deleteChartMutationArguments: IApolloMutationResult<IChart>) => {
          return (
            <Card className={styles.chart} ref={this.containerRef}>
              <CardMedia
                component={FittedChart}
                chart={chart}
                componentRef={this.containerRef}
                image='/static/images/cards/contemplative-reptile.jpg'
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {quote} / {base}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size='small'
                  color='secondary'
                  onClick={() => {
                    deleteChartMutate({
                      awaitRefetchQueries: true,
                      refreshQueries: [{
                        query: getUserWithDashboardWithChartsWithMarketByUserId,
                        variables: {
                          userId: this.props.userId,
                        },
                      }],
                      variables: {
                        id: chart.id,
                      },
                    })
                  }}
                >
                  <DeleteIcon /> Delete
                </Button>
              </CardActions>
            </Card>
          )
        }}
      </Mutation>
    )
  }
}
