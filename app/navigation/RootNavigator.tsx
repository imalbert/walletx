import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { WalletInfoThemed } from '../components/WalletInfo'
import { StackNavigator } from '../navigation/StackNavigator'

const Drawer = createDrawerNavigator()

export const RootNavigator = () => {
  return (
    <Drawer.Navigator drawerType="slide" drawerContent={() => <WalletInfoThemed />}>
      <Drawer.Screen name="Stack" component={StackNavigator} />
    </Drawer.Navigator>
  )
}