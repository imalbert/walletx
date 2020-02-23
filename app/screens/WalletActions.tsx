import React from 'react'
import { View } from 'react-native'

import { LogFormAdd } from '../components/Log/LogForm.Add'
import { LogFormEdit } from '../components/Log/LogForm.Edit'

// interface Props {
//   log?: LogModelType,
// }

export const WalletActions = ({ route }) => (
  <View style={{ flex: 1 }}>
    {route.params.log
      ? <LogFormEdit log={route.params.log} />
      : <LogFormAdd />
    }
  </View>
)
