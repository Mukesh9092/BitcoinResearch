import * as React from 'react'

import Grid from '@material-ui/core/Grid'

import * as styles from './styles.scss'

export const Page = ({ children }) => {
  return (
    <div className={styles.page}>
      <Grid container spacing={24}>
        {children}
      </Grid>
    </div>
  )
}
