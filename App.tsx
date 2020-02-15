import React from 'react'

import { Provider as PaperProvider, Appbar } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useTheme, Portal, FAB } from 'react-native-paper'

import { createDrawerNavigator, useIsDrawerOpen, DrawerNavigationProp } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'

import { RecordsList } from './app/components/RecordsList'
import { RecordForm } from './app/components/RecordForm'

const Drawer = createDrawerNavigator()

const Wallet = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

const Records = ({ navigation }) => {
  const showFAB = !useIsDrawerOpen()

  return (
    <>
    <View style={styles.container}>
      <RecordsList />
    </View>
    <Portal>
      {showFAB && <FAB
        icon="feather"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        onPress={() => navigation.navigate('RecordActions')}
      />}
    </Portal>
    </>
  )
}

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
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
        name="Records"
        component={Records}
        options={{ headerTitle: 'Records' }} />
      <Stack.Screen
        name="RecordActions"
        component={RecordActions}
        options={{ headerTitle: 'Actions' }} />
    </Stack.Navigator>
  )
}
const RecordActions = () => (
  <View style={styles.container}>
    <RecordForm />
  </View>
)

const RootNavigator = () => {
  return (
    <>
    <Drawer.Navigator drawerType="slide" drawerPosition="right" drawerContent={() => <Wallet />}>
      <Drawer.Screen name="Stack" component={StackNavigator} />
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
  container: { flex: 1, }
});
