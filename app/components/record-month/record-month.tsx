import React from 'react'

import { View } from 'react-native'
import { observer } from 'mobx-react'
import { useTheme, Theme } from 'react-native-paper'
import { useStore } from '../../model/Root'

import { RecordDay } from '../record-day'
import { LOG_TYPES } from '../../model/LogRecord'
import { currencyFmt } from '../../utils/format'

export const RecordMonth: React.FC<{}> = observer(() => {
  const theme = useTheme()
  const { record } = useStore()
  const logsByDay = record.getLogsByDayOfMonth()
  const days = Object.keys(logsByDay).sort((a, b) => {
    // Later dates are placed to the front of list
    return (a < b) ? 1 : (a > b) ? -1 : 0
  })
  const dateToday = new Date().getDate()

  // TODO:
  // why is days in "MM/DD/YY" format when i saved it as "MMM DD"?
  // date formats in android is different when in browser

  return (
    <RecordMonthPure
      theme={theme}
      days={days}
      dateToday={dateToday}
      logsByDay={logsByDay}
    />
  )
})

interface PureProps {
  theme: Theme,
  logsByDay: any,
  days: string[],
  dateToday: number,
}
export const RecordMonthPure: React.FC<PureProps> = ({
  theme,
  logsByDay,
  days,
  dateToday,
}) => (
  <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
    {days.map(day => {
      let totalExpenses = 0; let totalIncome = 0
      const logs = logsByDay[day]
      logs.forEach(log => log.type === LOG_TYPES.EXPENSE
        ? totalExpenses += log.amount : totalIncome += log.amount)

      return (
        <RecordDay
          key={`wallet.record.day-${day}`}
          title={day}
          description={`+ ${currencyFmt(totalIncome)} - ${currencyFmt(totalExpenses)}`}
          logs={logs}
          isItToday={parseInt(day.split(' ')[1]) === dateToday}
        />
      )
    })}
  </View>
)
