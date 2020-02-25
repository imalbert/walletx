import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Appbar, Text } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'

import { useStore } from '../model/Root'
import { Log } from '../model/LogRecord'

import { WalletLogs } from '../screens/WalletLogs'
import { WalletActions } from '../screens/WalletActions'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const Stack = createStackNavigator()

export const StackNavigator = () => {
  const { record } = useStore()
  const navigation = useNavigation()
  const [newLog] = useState(Log.create())

  const onAdd = () => {
    // record.add(newLog)
    navigation.goBack()
  }

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
              {previous ? (
                <Appbar.Action icon="close" onPress={navigation.goBack} />
              ) : (
                <Appbar.Action
                  icon="wallet"
                  onPress={() => ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()}
                />
              )}
              <Appbar.Content title={title} titleStyle={{ fontSize: 18, fontWeight: 'bold' }} />
              {options.headerRight
                ? options.headerRight({})
                : <Appbar.Action icon="note-plus" onPress={() => navigation.navigate('WalletActions') }/>
              }
              {/* {scene.route.name === 'WalletActions'
                ? <Appbar.Action icon="check" onPress={onSave}/>
                : <Appbar.Action icon="note-plus" onPress={() => navigation.navigate('WalletActions') }/>
              } */}
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
        options={{ headerTitle: 'Log' }}
        initialParams={{ route: {} }}
      />
    </Stack.Navigator>
  )
}