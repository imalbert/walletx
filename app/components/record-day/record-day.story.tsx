import React from 'react'

import { storiesOf } from '@storybook/react-native'
import {
  AppTheme,
  AppThemeDark,
} from '../../../App'

import { RecordDayPure as RecordDay } from './record-day'
import { Log } from '../../model/LogRecord'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

const props = {
  theme: AppTheme,
  controls: {
    expanded: true,
    onPress: () => {},
  },
  isItToday: false,
  title: 'Feb 28',
  description: '+ PHP 100 - PHP 50',
  logs: [
    Log.create({ amount: 30 }),
    Log.create({ amount: 20 }),
  ],
}

storiesOf('RecordDay', module)
  .addDecorator(fn => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="record-day">
        <Stack.Screen
          name="record-day"
          component={fn}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ))
  .add('is it today?', () => (
    <RecordDay {...props} isItToday={true} />
  ))
  .add('expanded', () => (
    <RecordDay {...props} />
  ))
  .add('collapsed', () => (
    <RecordDay
      {...props}
      controls={{
        expanded: false,
        onPress: () => {},
      }}
    />
  ))