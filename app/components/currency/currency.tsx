import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { currencyFmt } from '../../utils/format'

interface Props {
  children: string,
  color?: string;
  style?: {
    marginRight: number;
    marginVertical?: number;
  }
}
export const Currency: React.FC<Props> = ({
  children: value,
  color,
  style = {},
}) => (
  <Text style={{
    ...styles.currency,
    ...style,
    color,
  }}>
    {currencyFmt(value)}
  </Text>
)

const styles = StyleSheet.create({
  currency: {
    fontSize: 18,
    textAlignVertical: 'center',
  },
})
