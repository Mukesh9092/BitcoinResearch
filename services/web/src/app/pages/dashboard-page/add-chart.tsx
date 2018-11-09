import * as React from 'react'
import sortBy from 'lodash/sortBy'
import { Mutation, Query } from 'react-apollo'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { IApolloMutationResult } from '../../../../common/apollo/types/IApolloMutationResult'
import { IApolloQueryResult } from '../../../../common/apollo/types/IApolloQueryResult'
import { IChart } from '../../../../common/domain/types/IChart'
import { IMarket } from '../../../../common/domain/types/IMarket'
import { IUser } from '../../../../common/domain/types/IUser'
import { createChart } from '../../../../common/domain/mutations/createChart'
import { markets } from '../../../../common/domain/queries/markets'

import { ISelectOption, Select } from '../../components/select'

import * as styles from './styles.scss'

export interface IAddChartProps {
  onCancel: Function
  onSave: Function
  onDelete: Function
  createChartMutationArguments: IApolloQueryResult<IChart>
  deleteCHartMutationArguments: IApolloQueryResult<IChart>
  getUserWithDashboardArguments: IApolloQueryResult<IUser>
}

export interface IAddChartState {
  market: null | ISelectOption,
}

export class AddChart extends React.Component<IAddChartProps, IAddChartState> {
  public state: IAddChartState = {
    market: null,
  }

  public handleOnChange = (market: ISelectOption) => {
    this.setState({ market })
  }

  public render (): React.ReactElement<'div'> {
    const value = this.state.market

    return (
      <Mutation mutation={createChart}>
        {(createChartMutate: Function, createChartMutationArguments: IApolloMutationResult<IChart>) => {
          return (
            <Query query={markets}>
              {(marketsQueryArguments: IApolloQueryResult<IMarket[]>) => {
                let content

                if (marketsQueryArguments.loading) {
                  content = (
                    <div className={styles.loading}>
                      <CircularProgress />
                    </div>
                  )
                } else if (marketsQueryArguments.error) {
                  content = (
                    <div className={styles.error}>
                      <h1>Error</h1>
                      <pre>{JSON.stringify(this.props.marketsQueryArguments.error)}</pre>
                    </div>
                  )
                } else {
                  const data: IMarket[] = marketsQueryArguments.data.markets

                  if (!data || !data.length) {
                    content = (
                      <div className={styles.empty}>
                        <p>No markets.</p>
                      </div>
                    )
                  } else {
                    const sortedData: IMarket[] = sortBy(data, ['quote', 'base'])
                    const options: ISelectOption[] = sortedData.map((x: IMarket): ISelectOption => ({
                      label: `${x.quote}/${x.base}`,
                      value: x.id,
                    }))

                    content = (
                      <Select
                        className={styles.textField}
                        options={options}
                        onChange={this.handleOnChange}
                        value={this.state.market}
                        placeholder='Market'
                        disabled={createChartMutationArguments.loading}
                      />
                    )
                  }
                }

                return (
                  <div className={styles.addChart}>
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <Paper className={styles.paper}>
                          <h3>Add Chart</h3>

                          {content}

                          <Grid
                            container
                            direction='row'
                            justify='flex-end'
                            alignItems='center'
                            className={styles.addChartButtons}
                          >
                            <Grid item>
                              <Button
                                variant='text'
                                color='secondary'
                                aria-label='Cancel'
                                className={styles.addChartCancelButton}
                                onClick={this.props.onCancel}
                                disabled={createChartMutationArguments.loading}
                              >
                                Cancel
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant='contained'
                                color='primary'
                                aria-label='Save'
                                className={styles.addChartSaveButton}
                                onClick={(event: React.SyntheticEvent) => {
                                  event.preventDefault()

                                  const { data } = this.props.getUserWithDashboardArguments
                                  const dashboardId = data.user.dashboard.id

                                  createChartMutate({
                                    variables: {
                                      dashboardId,
                                      marketId: this.state.market.value,
                                    },
                                  })
                                }}
                                disabled={createChartMutationArguments.loading}
                              >
                                Save
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </div>
                )
              }}
            </Query>
          )
        }}
      </Mutation>
    )
  }
}
