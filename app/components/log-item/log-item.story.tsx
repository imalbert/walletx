import React from 'react'

import { storiesOf } from '@storybook/react-native'
import {
  AppTheme,
  AppThemeDark,
} from '../../../App'

import { LogItemPure as LogItem } from './log-item'
import { Log } from '../../model/LogRecord'

const props = {
  log: Log.create(),
  toggleEdit: () => {},
  navigation: () => {},
  theme: AppTheme,
}

storiesOf('LogItem', module)
  .add('normal', () => (
    <LogItem {...props} />
  ))
  .add('is editing', () => (
    <LogItem
      {...props}
      isEditing={true}
    />
  ))
  .add('dark theme', () =>
    <LogItem
      {...props}
      isEditing={true}
      theme={AppThemeDark}
    />
  )
