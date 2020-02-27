import React from 'react'
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

export const Sidebar = observer(() => {
  const {app} = useStore()
  const theme = useTheme()

  return (
    <SidebarPure
      theme={theme}
      onToggleTheme={app.toggleTheme}
    />
  )
})
interface Props {
  theme?: any,
  onToggleTheme : any,
}
export const SidebarPure: React.FC<Props> = ({
  theme = { colors: { background: 'white' }},
  onToggleTheme,
}) => (
  <SafeAreaView
    style={{
      ...styles.infoView,
      backgroundColor: theme.colors.background,
    }}
  >
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
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
})
