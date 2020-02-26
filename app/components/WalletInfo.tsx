import React from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react'
import { useStore } from '../model/Root'
import { Button, Text, withTheme } from 'react-native-paper'

interface Props {
  theme?: any
}

export const WalletInfo: React.FC<Props> = observer(({ theme = { colors: { background: 'white' }} }) => {
  const { record, app } = useStore()

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text>Summary of my wallet</Text>
      <Text>Balance ${record.getBalance()}</Text>
      <Button icon="camera" mode="contained" onPress={() => { app.toggleTheme() }}>
        theme switch
      </Button>
    </View>
  )
})

export const WalletInfoThemed = withTheme(WalletInfo)