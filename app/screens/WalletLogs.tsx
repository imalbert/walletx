import React from 'react'

import { ScrollView, StyleSheet } from 'react-native'
import { Portal, FAB, Text, Colors } from 'react-native-paper'
import { useIsDrawerOpen } from '@react-navigation/drawer'

import { WalletRecords } from '../components/Wallet/Wallet.Records'

export const WalletLogs = ({ navigation }) => {
  const showFAB = !useIsDrawerOpen()

  return (
    <>
    <ScrollView style={{ flex: 1 }}>
      <WalletRecords />
    </ScrollView>
    <Portal>
      {showFAB && <FAB
        icon="feather"
        style={{ position: 'absolute', bottom: 16, right: 16 }}
        onPress={() => navigation.navigate('WalletActions')}
      />}
    </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: Colors.amber100 },
})