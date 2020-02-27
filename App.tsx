import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { DefaultTheme, Colors, Provider as PaperProvider, Theme } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import { RootNavigator } from './app/navigation/RootNavigator'
import { Provider, setupRootStore, useStore } from './app/model/Root'

import StorybookUIRoot from './storybook'

function App() {
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

export const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.black,
    accent: Colors.black,
    background: Colors.white,
    text: Colors.black,
  }
}
export const AppThemeDark: Theme = {
  ...AppTheme,
  dark: true,
  colors: {
    ...AppTheme.colors,
    primary: Colors.white,
    accent: Colors.white,
    background: Colors.black,
    text: Colors.white,
  }
}

const AppWithTheme = observer(() => {
  const { app } = useStore()
  const theme = app.theme === 'dark'
    ? AppThemeDark
    : AppTheme

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
})

// export default App
export default StorybookUIRoot