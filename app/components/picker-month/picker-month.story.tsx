import React from 'react'

import { storiesOf } from '@storybook/react-native'

import { PickerMonthPure as PickerMonth } from './picker-month'
import { AppTheme } from '../../../App'

const data = ['Feb 2020', 'Mar 2020', 'Apr 2020']
storiesOf('PickerMonth', module)
  .add('normal display', () => (
    <PickerMonth
      theme={AppTheme}
      label={data[1]}
    />
  ))