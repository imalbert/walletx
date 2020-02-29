import React from 'react'
import { Appbar, useTheme } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'

import { WalletLogs } from '../screens/WalletLogs'
import { WalletActions } from '../screens/WalletActions'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const Stack = createStackNavigator()

export const StackNavigator = () => {
  const theme = useTheme()
  return (
    <Stack.Navigator
      initialRouteName="My Wallet"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name

          return (
            <Appbar.Header theme={theme} style={{ backgroundColor: theme.colors.background }}>
              {previous
                ? <Appbar.Action icon="close" onPress={navigation.goBack} />
                : <Appbar.Action
                    icon="wallet"
                    size={36}
                    onPress={() => ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()}
                  />}

              {title === 'balance'
                ? <Appbar.Action
                    style={{ alignSelf: 'center', flexGrow: 1 }}
                    icon="pig"
                    size={72}
                    theme={theme}
                  />
                : <Appbar.Content
                    title={title}
                    titleStyle={{ fontSize: 24, textAlign: 'justify' }}
                    style={{ flexGrow: 1, alignItems: 'center' }}
                  />}

              {options.headerRight
                ? options.headerRight({})
                : <Appbar.Action
                    icon="plus"
                    size={36}
                    onPress={() => navigation.navigate('WalletActions') }
                  />}
            </Appbar.Header>
          )
        }
      }}
    >
      <Stack.Screen
        name="My Wallet"
        component={WalletLogs}
        options={{ headerTitle: 'balance' }}
      />
      <Stack.Screen
        name="WalletActions"
        component={WalletActions}
        options={{ headerTitle: 'Log' }}
        initialParams={{ route: {} }}
      />
    </Stack.Navigator>
  )
}