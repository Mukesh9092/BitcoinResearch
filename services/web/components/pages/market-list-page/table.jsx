import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'emotion'

import ReactTable from 'react-table'
import treeTableHOC from 'react-table/lib/hoc/treeTable'

import { OHLCVChart } from './ohlcv-chart'

const TreeTable = treeTableHOC(ReactTable)

const containerClassName = css`
  padding: 50px;
  background-color: #fefefe;
`

const tableClassName = css`
  width: 100%;
`

function getTdProps(state, ri, ci) {
  console.log('getTdProps???', { state, ri, ci })
  return {}
}

export const TableComponent = (props) => {
  const { header, data, classes } = props

  return (
    <div className={containerClassName}>
      <h3>{header}</h3>

      <TreeTable
        filterable
        defaultFilterMethod={(filter, row, column) => {
          // TODO: Explain this one to myself.
          const id = filter.pivotId || filter.id
          return row[id] !== undefined
            ? String(row[id])
                .toLowerCase()
                .includes(filter.value.toLowerCase())
            : true
        }}
        data={data}
        defaultPageSize={10}
        // pivotBy={['trader', 'category']}
        columns={[
          {
            Header: 'Trader',
            accessor: 'trader',
          },
          {
            Header: 'Category',
            accessor: 'category',
          },
          {
            Header: 'Type',
            accessor: 'type',
          },
          {
            Header: 'Base',
            accessor: 'base',
          },
          {
            Header: 'Quote',
            accessor: 'quote',
          },
        ]}
        SubComponent={(row) => {
          const period = '1h'
          const to = new Date()
          const from = new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000)
          const fromDate = from.toISOString()
          const toDate = to.toISOString()

          const { trader, base, quote } = row.original

          return (
            <OHLCVChart
              trader={trader}
              base={base}
              quote={quote}
              period={period}
              from={fromDate}
              to={toDate}
            />
          )
        }}
      />
    </div>
  )
}

export const Table = TableComponent

// base quote trader category type
