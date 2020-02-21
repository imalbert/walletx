import React from 'react'
import { View, Text } from 'react-native'

import { observer } from 'mobx-react'
import { useStore } from '../model/Root'

interface Props {}

export const WalletInfo: React.FC<Props> = observer(() => {
  const { record } = useStore()

  return (
    <View style={{ flex: 1 }}>
      <Text>Summary of my wallet</Text>
      <Text>Balance ${record.getBalance()}</Text>
    </View>
  )
})
