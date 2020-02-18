import * as React from 'react'
import { observer } from 'mobx-react'

import { DataTable } from 'react-native-paper'
import { useStore } from '../model/Root'
import { LogModelType } from '../model/LogRecord'

interface LogListProps {}

export const LogList: React.FC<LogListProps> = observer(() => {
  const { record } = useStore()

  return (
    <>
    {record.logs.map((log, idx) => (
      <LogItem log={log} key={`log-item-${idx}`} />
    ))}
    </>
  )
})

export const RecordLogs = observer(() => {
  const { record } = useStore()
  const logsByDay = record.getLogsByDayOfMonth()
  const days = Object.keys(logsByDay).sort()

  // QUESTION: why is days in "MM/DD/YY" format when i saved it as "MMM DD"?
  // console.log(logsByDay)

  return (
    <>
    {days.map(day => (
      <DataTable key={day}>
        <DataTable.Header>
          <DataTable.Title>{day}</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>
        {logsByDay[day].map((log, idx) => (
          <LogItem log={log} key={`log-item-${idx}`} />
        ))}
      </DataTable>
    ))}
    </>
  )
})

interface LogItemProps {
  log: LogModelType
}

export const LogItem: React.FC<LogItemProps> = ({ log }) => (
  <DataTable.Row>
    <DataTable.Cell>{log.category}</DataTable.Cell>
    <DataTable.Cell numeric>{log.amount}</DataTable.Cell>
  </DataTable.Row>
)
