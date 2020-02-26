import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { DefaultTheme, Colors, Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import { RootNavigator } from './app/navigation/RootNavigator'
import { Provider, setupRootStore, useStore } from './app/model/Root'

export default function App() {
  const [rootStore, setRootStore] = useState(undefined)
  useEffect(() => {
    setupRootStore().then(setRootStore)
  }, [])

  if (!rootStore) {
    return null
  }

  return (
    <Provider value={rootStore}>
      <AppWithTheme />
    </Provider>
  )
}

const AppWithTheme = observer(() => {
  const { app } = useStore()

  const isDark = app.theme === 'dark'
  const theme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      primary: isDark ? Colors.black : Colors.white,
      secondary: isDark ? Colors.white : Colors.black,
      background: isDark ? Colors.black : Colors.white,
      text: isDark ? Colors.white : Colors.black,
    },
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
})