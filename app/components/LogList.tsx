import * as React from 'react'
import { observer } from 'mobx-react'

import { DataTable } from 'react-native-paper'
import { useStore } from '../model/Root'
import { LogModelType } from '../model/LogRecord'

interface LogListProps {}

export const LogList: React.FC<LogListProps> = observer(() => {
  const { record } = useStore()
  console.log(record.logs)

  return (
    <>
    {record.logs.map((log, idx) => (
      <LogItem log={log} key={`log-item-${idx}`} />
    ))}
    </>
  )
})

const RecordItem = () => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>

      <RecordItem />
      <RecordItem />
      <RecordItem />
    </DataTable>
  )
}

interface LogItemProps {
  log: LogModelType
}

export const LogItem: React.FC<LogItemProps> = ({ log }) => (
  <DataTable.Row>
    <DataTable.Cell>{log.category}</DataTable.Cell>
    <DataTable.Cell numeric>{log.amount}</DataTable.Cell>
  </DataTable.Row>
)
