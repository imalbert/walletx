import React from 'react'

import { storiesOf } from '@storybook/react-native'

import { Currency } from './currency'

storiesOf('Currency', module)
  .add('format PHP currency', () => (
    <Currency>
      {'1000'}
    </Currency>
  ))