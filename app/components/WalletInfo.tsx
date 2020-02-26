import React, { useState } from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react'
import { useStore } from '../model/Root'
import { Text, Divider, Switch, withTheme } from 'react-native-paper'

interface Props {
  theme?: any
}

export const WalletInfo: React.FC<Props> = observer(({ theme = { colors: { background: 'white' }} }) => {
  const { record, app } = useStore()
  const [isDarkTheme, toggleDarkTheme] = useState(false)

  const onToggleThemeSwitch = () => {
    app.toggleTheme()
    toggleDarkTheme(!isDarkTheme)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: theme.colors.background }}>
      <Divider />
      <View style={{ padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>Toggle dark theme</Text>
        <Switch value={isDarkTheme} onValueChange={onToggleThemeSwitch} />
      </View>
    </View>
  )
})

export const WalletInfoThemed = withTheme(WalletInfo)