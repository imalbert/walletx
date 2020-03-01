import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native'

import { observer } from 'mobx-react'
import { useStore } from '../../model/Root'
import {
  Text,
  Divider,
  Switch,
  useTheme,
} from 'react-native-paper'
import { currencyFmt } from '../../utils/format'
import { PickerMonth } from '../picker-month'

export const Sidebar = observer(() => {
  const {app, record} = useStore()
  const theme = useTheme()
  const logsMoYr = record.getMonthsWithLogs()
  const balance = currencyFmt(record.getBalance())
  return (
    <SidebarPure
      theme={theme}
      onToggleTheme={app.toggleTheme}
      logsMoYr={logsMoYr}
      balance={balance}
    />
  )
})
interface Props {
  theme?: any,
  onToggleTheme : any,
  logsMoYr: string[],
  balance: string,
}
export const SidebarPure: React.FC<Props> = ({
  theme = { colors: { background: 'white' }},
  onToggleTheme,
  logsMoYr,
  balance,
}) => (
  <SafeAreaView
    style={{
      ...styles.infoView,
      backgroundColor: theme.colors.background,
    }}
  >
    <Divider />
    <View style={styles.infoSection}>
      <Text>
        Wallet balance
      </Text>
      <Text style={{ fontSize: 24 }}>
        {balance}
      </Text>
    </View>
    <Divider />
    <View style={styles.infoSection}>
      <PickerMonth />
    </View>
    <Divider />
    <View style={styles.infoSection}>
      <Text>Toggle dark theme</Text>
      <Switch
        value={theme.dark}
        onValueChange={onToggleTheme}
      />
    </View>
  </SafeAreaView>
)
const styles = StyleSheet.create({
  infoView: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  infoSection: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginRight: 8,
  },
})
