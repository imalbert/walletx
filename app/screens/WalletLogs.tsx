import React from 'react'
import { observer } from 'mobx-react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

import { useStore } from '../model/Root'
import { RecordMonth } from '../components/record-month'

export const WalletLogs = observer(() => {
  const theme = useTheme()
  const { record } = useStore()

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}>
      {record.logs.length === 0
        ? (
          <ScrollView>
            <Text theme={theme} style={{ ...styles.text, fontSize: 24 }}>
              I'm Percy,
            </Text>
            <Text theme={theme} style={styles.text}>
              pleased to meet you!
            </Text>
            <Text theme={theme} style={styles.text}>
              I could help record your daily cash expenses and incomes.
            </Text>
            <Text theme={theme} style={styles.text}>
              But there can't be any expense with an empty wallet can there?!
            </Text>
            <Text theme={theme} style={styles.text}>
              So to start, press the '+' over there in the corner.
            </Text>
            <Text theme={theme} style={styles.text}>
              This feels to be the start of a strong and trusting relationship!
            </Text>
          </ScrollView>
        )
        : <RecordMonth />
      }
    </View>
  )
})

const styles = StyleSheet.create({
  text: { fontSize: 14, textAlign: 'center', margin: 8 }
})