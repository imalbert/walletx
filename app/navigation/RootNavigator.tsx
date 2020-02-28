import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Sidebar } from '../components/sidebar'
import { StackNavigator } from '../navigation/StackNavigator'

const Drawer = createDrawerNavigator()

export const RootNavigator = () => {
  return (
    <Drawer.Navigator drawerType="slide" drawerContent={() => <Sidebar />}>
      <Drawer.Screen name="Stack" component={StackNavigator} />
    </Drawer.Navigator>
  )
}