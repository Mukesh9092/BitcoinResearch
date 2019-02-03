import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'

import Page from '../../page'

@withRouter
@inject('store')
@observer
class NotFoundPageComponent extends React.Component {
  render() {
    return (
      <Page>
        <Grid item xs={12}>
          <h1>Not Found</h1>
        </Grid>
      </Page>
    )
  }
}

export const NotFoundPage = NotFoundPageComponent
