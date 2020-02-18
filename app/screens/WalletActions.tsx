import React from 'react'
import { View } from 'react-native'

import { LogFormAdd } from '../components/LogFormAdd'
import { LogFormEdit } from '../components/LogFormEdit'
import { LogModelType } from '../model/LogRecord'

// interface Props {
//   log?: LogModelType,
// }

export const WalletActions = ({ route }) => (
  <View style={{ flex: 1 }}>
    {console.log(route.params.log)}
    {route.params.log
      ? <LogFormEdit log={route.params.log} />
      : <LogFormAdd />
    }
  </View>
)
