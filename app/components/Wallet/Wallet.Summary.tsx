import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, Text } from 'react-native-paper'

interface Props {
  balance: string,
}

export const WalletSummary: React.FC<Props> = ({ balance }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 24 }}>Balance</Text>
      <Text style={styles.balance}>
        $ {balance}.00
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },
  balance: {
    fontSize: 32,
    color: Colors.grey800,
    flexGrow: 1,
    textAlign: 'right',
  },
})