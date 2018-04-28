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

import { log } from '../../../../../common/log'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    // minWidth: 700,
  },
})

export const TableComponent = props => {
  const { data, classes } = props

  return (
    <Paper className={classes.root}>
      <MaterialTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Rate</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={row.key}>
              <TableCell>{row.rate}</TableCell>
              <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </Paper>
  )
}

export const Table = withStyles(styles)(TableComponent)
