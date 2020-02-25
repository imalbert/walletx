import React, { useState } from 'react'
import { Appbar } from 'react-native-paper'

import { Log, LogModelType } from '../../model/LogRecord'
import { LogForm } from './LogForm'
import { useStore } from '../../model/Root'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

interface Props {}

export const LogFormAdd: React.FC<Props> = () => {
  const { record } = useStore()
  const navigation = useNavigation()
  const [newLog] = useState(Log.create())

  const onAdd = () => {
    record.add(newLog)
    navigation.goBack()
  }

  navigation.setOptions({
    headerRight: (props) => {
      console.log('its props', props)
      return <Appbar.Action icon="check" onPress={onAdd}/>
    },
  })
  console.log('setOptions')

  return (
    <>
    <LogForm log={newLog} />
    <Button onPress={onAdd}>Add</Button>
    </>
  )
}