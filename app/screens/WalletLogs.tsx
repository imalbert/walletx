import React from 'react'

import { ScrollView } from 'react-native'

import { RecordMonth } from '../components/record-month'

export const WalletLogs = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <RecordMonth />
    </ScrollView>
  )
}