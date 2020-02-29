import React, { useState } from 'react'
import { View } from 'react-native'

import { LogForm } from '../components/log-form'

import { useStore } from '../model/Root'
import { clone, applySnapshot } from 'mobx-state-tree'
import { Log, LOG_TYPES, LOG_CATEGORY } from '../model/LogRecord'
// interface Props {
//   log?: LogModelType,
// }

import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'

export const WalletActions = ({ route }) => {
  const { record } = useStore()
  const navigation = useNavigation()
  const isFirstLog = record.logs.length === 0

  let onPressSave = route.params.log
    ? () => {
        console.log('editing log', log)
        applySnapshot(route.params.log, log)
        navigation.goBack()
      }
    : () => {
      console.log('saving log', log)
      record.add(log)
      navigation.goBack()
    }
  let log = route.params.log
    ? clone(route.params.log)
    : isFirstLog
      ? Log.create({ type: LOG_TYPES.INCOME, category: LOG_CATEGORY.INCOME })
      : Log.create()

  navigation.setOptions({
    headerRight: () => <Appbar.Action icon="pencil" onPress={onPressSave}/>,
  })

  return <LogForm log={log} onlyIncome={isFirstLog} />
}