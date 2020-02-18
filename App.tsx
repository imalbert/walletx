import React, { useEffect, useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import { RootNavigator } from './app/navigation/RootNavigator'
import { Provider, setupRootStore } from './app/model/Root'

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
      <PaperProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}