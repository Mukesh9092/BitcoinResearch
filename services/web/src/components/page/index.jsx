import * as React from 'react'

import Grid from '@material-ui/core/Grid'

import * as styles from './styles.scss'

export class PageComponent extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        <Grid container spacing={24}>
          {this.props.children}
        </Grid>
      </div>
    )
  }
}

export const Page = PageComponent
