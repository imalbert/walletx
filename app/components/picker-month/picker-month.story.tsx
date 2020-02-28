import React from 'react'

import { storiesOf } from '@storybook/react-native'

import { PickerMonth } from './picker-month'

const data = ['Feb 2020', 'Mar 2020', 'Apr 2020']
storiesOf('PickerMonth', module)
  .add('normal display', () => (
    <PickerMonth data={data} />
  ))