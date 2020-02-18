import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Appbar, Text } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'

import { WalletLogs } from '../screens/WalletLogs'
import { WalletActions } from '../screens/WalletActions'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const Stack = createStackNavigator()

export const StackNavigator = () => {
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
            <Appbar.Header>
              <Appbar.Content title={title} titleStyle={{ fontSize: 18, fontWeight: 'bold' }} />
              {previous ? (
                <Appbar.Action icon="close" onPress={navigation.goBack} />
              ) : (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => {
                    ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
                  }}
                >
                  <Text>
                    open drawer
                  </Text>
                </TouchableOpacity>
              )}
            </Appbar.Header>
          )
        }
      }}
    >
      <Stack.Screen
        name="My Wallet"
        component={WalletLogs}
        options={{ headerTitle: 'My Wallet' }}
      />
      <Stack.Screen
        name="WalletActions"
        component={WalletActions}
        options={{ headerTitle: 'Actions' }}
        initialParams={{ route: {} }}
      />
    </Stack.Navigator>
  )
}