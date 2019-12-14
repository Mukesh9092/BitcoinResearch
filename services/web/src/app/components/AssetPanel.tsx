import { HTMLTable } from '@blueprintjs/core'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Asset } from '../domain/Asset'

const Row = styled.tr`
  &:hover {
    cursor: pointer;
    background-color: #394b59;
  }
`

const FirstCell = styled.td`
  text-decoration: underline;
`

interface AssetPanelProps {
  assets: Asset[]
}

const AssetPanel = ({ assets }: AssetPanelProps) => {
  return (
    <HTMLTable>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Base</th>
          <th>Quote</th>
          <th>Maker Fee</th>
          <th>Taker Fee</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => {
          return (
            <Link key={asset.id} href={`/assets/${asset.id}`}>
              <Row>
                <FirstCell>{asset.symbol}</FirstCell>
                <td>{asset.base}</td>
                <td>{asset.quote}</td>
                <td>{asset.maker}</td>
                <td>{asset.taker}</td>
              </Row>
            </Link>
          )
        })}
      </tbody>
    </HTMLTable>
  )
}

export default AssetPanel
