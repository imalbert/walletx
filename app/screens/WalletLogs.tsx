import React from 'react'

import { ScrollView } from 'react-native'
import { Portal, FAB } from 'react-native-paper'
import { useIsDrawerOpen } from '@react-navigation/drawer'

import { LogList } from '../components/LogList'

export const WalletLogs = ({ navigation }) => {
  const showFAB = !useIsDrawerOpen()

  return (
    <>
    <ScrollView style={{ flex: 1 }}>
      <LogList />
    </ScrollView>
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

