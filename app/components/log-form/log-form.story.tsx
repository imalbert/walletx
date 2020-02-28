import React from 'react'

import { storiesOf } from '@storybook/react-native'

import { LogForm } from './log-form'
import { Log } from '../../model/LogRecord'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

const props = {
  log: Log.create({ date: 1582852143114 }),
}

storiesOf('LogForm', module)
  .addDecorator(fn => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="log-form">
        <Stack.Screen
          name="log-form"
          component={fn}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ))
  .add('Display all days', () => (
    <LogForm
      {...props}
    />
  ))
