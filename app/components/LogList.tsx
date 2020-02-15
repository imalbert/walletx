import * as React from 'react'
import { DataTable } from 'react-native-paper'

export function RecordsList () {
  return (
    <>
    <Record />
    <Record />
    </>
  )
}

export function Record() {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Feb 15</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>

      <RecordItem />
      <RecordItem />
      <RecordItem />
    </DataTable>
  )
}

const RecordItem = () => (
  <DataTable.Row>
    <DataTable.Cell>Dessert</DataTable.Cell>
    <DataTable.Cell numeric>1.00</DataTable.Cell>
  </DataTable.Row>
)