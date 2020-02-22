import * as React from 'react'
import { observer } from 'mobx-react'

import { DataTable, Button } from 'react-native-paper'
import { useStore } from '../model/Root'
import { LogModelType } from '../model/LogRecord'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

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
  const days = Object.keys(logsByDay).sort((a, b) => {
    // Later dates are placed to the front of list
    return (a < b) ? 1 : (a > b) ? -1 : 0
  })

  // TODO:
  // why is days in "MM/DD/YY" format when i saved it as "MMM DD"? Fix it

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

export const LogItem: React.FC<LogItemProps> = observer(({ log }) => {
  const [isEditing, changeIsEditing] = React.useState(false)
  const navigation = useNavigation()

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => changeIsEditing(false)}
        onLongPress={() => changeIsEditing(true)}>
      <DataTable.Row>
        <DataTable.Cell>{log.category}</DataTable.Cell>
        <DataTable.Cell numeric>{log.amount}</DataTable.Cell>
      </DataTable.Row>
      </TouchableWithoutFeedback>

      {isEditing &&
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button onPress={() => changeIsEditing(false)}>Cancel</Button>
        <Button onPress={() => { log.remove() }}>Remove</Button>
        <Button onPress={() => { navigation.navigate('WalletActions', { log }) }}>Edit</Button>
      </View>
      }
    </>
  )
})
