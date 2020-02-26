import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, Text } from 'react-native-paper'
import { currencyFmt } from '../../utils/format'

interface Props {
  balance: string,
}

export const WalletSummary: React.FC<Props> = ({ balance }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 24 }}>Balance</Text>
      <Text style={styles.balance}>
        {currencyFmt(balance)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginTop: 2,
    borderColor: 'black',
    borderWidth: 1,
  },
  balance: {
    fontSize: 32,
    color: Colors.grey800,
    flexGrow: 1,
    textAlign: 'right',
  },
})