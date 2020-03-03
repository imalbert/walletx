import React from 'react'

import { storiesOf } from '@storybook/react-native'

import { Line } from './chart-line'

storiesOf('Line chart', module)
  .add('display', () => (
    <Line />
  ))
