import * as React from 'react'

import Paper from '@material-ui/core/Paper'
import MaterialTable from '@material-ui/core/Table'
import MaterialTableBody from '@material-ui/core/TableBody'
import MaterialTableCell from '@material-ui/core/TableCell'
import MaterialTableHead from '@material-ui/core/TableHead'
import MaterialTableRow from '@material-ui/core/TableRow'

import * as styles from './styles.scss'

export const TableComponent = (props) => {
  const { header, data } = props

  return (
    <Paper className={`${styles.paper} ${styles.tablePaper}`}>
      <h1>{header}</h1>

      <MaterialTable header={header} data={data}>
        <MaterialTableHead>
          <MaterialTableRow>
            <MaterialTableCell>#</MaterialTableCell>
            <MaterialTableCell>Trader</MaterialTableCell>
            <MaterialTableCell>Category</MaterialTableCell>
            <MaterialTableCell>Type</MaterialTableCell>
            <MaterialTableCell>Base</MaterialTableCell>
            <MaterialTableCell>Quote</MaterialTableCell>
          </MaterialTableRow>
        </MaterialTableHead>
        <MaterialTableBody>
          {data.map((row) => (
            <MaterialTableRow key={row.id}>
              <MaterialTableCell>{row.id}</MaterialTableCell>
              <MaterialTableCell>{row.trader}</MaterialTableCell>
              <MaterialTableCell>{row.category}</MaterialTableCell>
              <MaterialTableCell>{row.type}</MaterialTableCell>
              <MaterialTableCell>{row.base}</MaterialTableCell>
              <MaterialTableCell>{row.quote}</MaterialTableCell>
            </MaterialTableRow>
          ))}
        </MaterialTableBody>
      </MaterialTable>
    </Paper>
  )
}

export const Table = TableComponent
