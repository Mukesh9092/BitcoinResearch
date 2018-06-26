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

const styles = (theme) => {
  return {
    root: {
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
  const { data, classes } = props

  return (
    <Paper className={classes.root}>
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
            return (
              <TableRow key={row.key}>
                <TableCell>
                  <Link to={`/market/${row.id}`}>{row.id}</Link>
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
