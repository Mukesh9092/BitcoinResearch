import React from 'react'
import { Link } from 'react-router-dom'

export const TableComponent = (props) => {
  const { header, data } = props

  return (
    <div className="table">
      <h3>{header}</h3>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Trader</th>
            <th>Category</th>
            <th>Type</th>
            <th>Base</th>
            <th>Quote</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.trader}</td>
              <td>{row.category}</td>
              <td>{row.type}</td>
              <td>{row.base}</td>
              <td>{row.quote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Table = TableComponent
