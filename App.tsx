import React from 'react'

import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import { StyleSheet, Text, View } from 'react-native'
import { Portal, FAB } from 'react-native-paper'

import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

const Wallet = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

const Records = () => {
  const showFAB = !useIsDrawerOpen()

  return (
    <>
    <View style={styles.container}>
      <Text>Transaction Records</Text>
    </View>
    <Portal>
      {showFAB && <FAB
        icon="feather"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      />}
    </Portal>
    </>
  )
}

const RootNavigator = () => {
  return (
    <>
    <Drawer.Navigator drawerContent={() => <Wallet />}>
      <Drawer.Screen name="Records" component={Records} />
    </Drawer.Navigator>
    
    </>
  )
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
