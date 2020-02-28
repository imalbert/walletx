import React from 'react'

import { AppTheme } from '../../../App'

import { storiesOf } from '@storybook/react-native'
import { Record, Log, LOG_TYPES } from '../../model/LogRecord'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()
import { RecordMonthPure as RecordMonth } from './record-month'

const DUMMY_TODAY = 1582852143114
const DUMMY_YESTERDAY = 1582732800000

const dummyRecord = Record.create()
dummyRecord.add(Log.create({ amount: 30, date: DUMMY_TODAY }))
dummyRecord.add(Log.create({ amount: 20, date: DUMMY_TODAY }))
dummyRecord.add(Log.create({ amount: 99, date: DUMMY_YESTERDAY, type: LOG_TYPES.INCOME }))

const logsByDay = dummyRecord.getLogsByDayOfMonth(new Date(DUMMY_TODAY))
const days = Object.keys(logsByDay).sort((a, b) => {
  // Later dates are placed to the front of list
  return (a < b) ? 1 : (a > b) ? -1 : 0
})
const props = {
  theme: AppTheme,
  logsByDay,
  days,
  dateToday: DUMMY_TODAY,
}
storiesOf('RecordMonth', module)
  .addDecorator(fn => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="record-month">
        <Stack.Screen
          name="record-month"
          component={fn}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ))
  .add('Display all days', () => (
    <RecordMonth
      {...props}
      theme={AppTheme}
    />
  ))
