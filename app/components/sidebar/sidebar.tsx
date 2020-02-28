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
import { PickerMonth } from '../picker-month'

export const Sidebar = observer(() => {
  const {app, record} = useStore()
  const theme = useTheme()
  const logsMoYr = record.getMonthsWithLogs()

  return (
    <SidebarPure
      theme={theme}
      onToggleTheme={app.toggleTheme}
      logsMoYr={logsMoYr}
    />
  )
})
interface Props {
  theme?: any,
  onToggleTheme : any,
  logsMoYr: string[],
}
export const SidebarPure: React.FC<Props> = ({
  theme = { colors: { background: 'white' }},
  onToggleTheme,
  logsMoYr,
}) => (
  <SafeAreaView
    style={{
      ...styles.infoView,
      backgroundColor: theme.colors.background,
    }}
  >
    <Divider />
    <View style={styles.infoSection}>
      <PickerMonth data={logsMoYr}/>
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
    justifyContent: 'space-between'
  },
})
