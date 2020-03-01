import React from 'react'

import { ScrollView, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { useTheme, Theme, Text, IconButton } from 'react-native-paper'
import { useStore } from '../../model/Root'

import { RecordDay } from '../record-day'
import { LOG_TYPES } from '../../model/LogRecord'
import { currencyFmt } from '../../utils/format'

const styles = StyleSheet.create({
  text: { fontSize: 14, textAlign: 'center', margin: 8 }
})
export const RecordMonth: React.FC<{}> = observer(() => {
  const theme = useTheme()
  const { record, app } = useStore()
  const monthNow = app.getMonthDateObj()
  const logsByDay = record.getLogsByDayOfMonth(monthNow)

  const logsThisMonth = Object.keys(logsByDay).length
  console.log(`Logs this month of ${app.month} ${logsThisMonth}`)
  if (logsThisMonth === 0) {
    return (
      <ScrollView>
        <Text theme={theme} style={{ ...styles.text, fontSize: 24 }}>
          {`It's ${app.month}!`}
        </Text>
        <Text theme={theme} style={styles.text}>
          Good work!
        </Text>
        <Text theme={theme} style={styles.text}>
          By the way, you can switch months from the sidebar.
        </Text>
      </ScrollView>
    )
  }

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
  theme = {colors: {background: 'white'}},
  logsByDay,
  days,
  dateToday,
}) => (
  <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background }}>
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
  </ScrollView>
)