import React from 'react'

import { View } from 'react-native'
import { observer } from 'mobx-react'
import { useTheme } from 'react-native-paper'
import { useStore } from '../../model/Root'

import { WalletSummary } from './Wallet.Summary'
import { WalletHistory } from './Wallet.History'
import { LOG_TYPES } from '../../model/LogRecord'
import { currencyFmt } from '../../utils/format'

export const WalletRecords: React.FC<{}> = observer(() => {
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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {days.map(day => {
        let totalExpenses = 0; let totalIncome = 0
        const logs = logsByDay[day]
        logs.forEach(log => log.type === LOG_TYPES.EXPENSE
          ? totalExpenses += log.amount : totalIncome += log.amount)

        return (
          <WalletHistory
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
})
