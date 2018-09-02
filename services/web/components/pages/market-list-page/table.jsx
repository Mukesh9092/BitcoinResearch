import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import MaterialTable, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => {
  return {
    root: {
      ...theme.mixins.gutters(),
      marginTop: theme.spacing.unit,
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  }
}

export const TableComponent = (props) => {
  const { header, data, classes } = props

  return (
    <Paper className={classes.root}>
      <Typography variant="headline" component="h3">
        {header}
      </Typography>
      <Typography component="p">
        Paper can be used to build surface or other elements for your
        application.
      </Typography>

      <MaterialTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const key = `${row.base}-${row.quote}`

            return (
              <TableRow key={row.key}>
                <TableCell>
                  <Link to={`/markets/${key}`}>{key}</Link>
                </TableCell>
                <TableCell>{row.base}</TableCell>
                <TableCell>{row.quote}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </MaterialTable>
    </Paper>
  )
}

export const Table = withStyles(styles)(TableComponent)
