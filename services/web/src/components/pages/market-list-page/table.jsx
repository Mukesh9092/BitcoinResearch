import * as React from 'react'

// import MUIDataTable from 'mui-datatables'

import * as styles from './styles.scss'

export const TableComponent = (props) => {
  const { header, data } = props

  const mappedData = data.map((row) => [
    row.base,
    row.quote,
    row.category,
    row.type,
    row.trader,
  ])

  return (
    <h1>Out of Order!</h1>
  )

  /*
  return (
    <MUIDataTable
      className={`${styles.paper} ${styles.tablePaper}`}
      title={header}
      data={mappedData}
      columns={[
        {
          name: 'Base',
          options: {
            filter: true,
          },
        },
        {
          name: 'Quote',
          options: {
            filter: true,
          },
        },
        {
          name: 'Category',
          options: {
            filter: true,
          },
        },
        {
          name: 'Type',
          options: {
            filter: true,
          },
        },
        {
          name: 'Trader',
          options: {
            filter: false,
          },
        },
      ]}
      options={{
        filterType: 'checkbox',
      }}
    />
  )
  */

  // return (
  //   <Paper className={`${styles.paper} ${styles.tablePaper}`}>
  //     <h1>{header}</h1>
  //
  //     <MaterialTable header={header} data={data}>
  //       <MaterialTableHead>
  //         <MaterialTableRow>
  //           <MaterialTableCell>#</MaterialTableCell>
  //           <MaterialTableCell>Trader</MaterialTableCell>
  //           <MaterialTableCell>Category</MaterialTableCell>
  //           <MaterialTableCell>Type</MaterialTableCell>
  //           <MaterialTableCell>Base</MaterialTableCell>
  //           <MaterialTableCell>Quote</MaterialTableCell>
  //         </MaterialTableRow>
  //       </MaterialTableHead>
  //       <MaterialTableBody>
  //         {data.map((row) => (
  //           <MaterialTableRow key={row.id}>
  //             <MaterialTableCell>{row.id}</MaterialTableCell>
  //             <MaterialTableCell>{row.trader}</MaterialTableCell>
  //             <MaterialTableCell>{row.category}</MaterialTableCell>
  //             <MaterialTableCell>{row.type}</MaterialTableCell>
  //             <MaterialTableCell>{row.base}</MaterialTableCell>
  //             <MaterialTableCell>{row.quote}</MaterialTableCell>
  //           </MaterialTableRow>
  //         ))}
  //       </MaterialTableBody>
  //     </MaterialTable>
  //   </Paper>
  // )
}

export const Table = TableComponent
