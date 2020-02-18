import React, { useState } from 'react'

import { Log } from '../model/LogRecord'
import { LogForm } from './LogForm'
import { useStore } from '../model/Root'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

interface Props {
}

export const LogFormAdd: React.FC<Props> = () => {
  const { record } = useStore()
  const navigation = useNavigation()
  const [newLog] = useState(Log.create())

  const onAdd = () => {
    record.add(newLog)
    navigation.goBack()
  }

  return (
    <>
    <LogForm log={newLog} />
    <Button onPress={onAdd}>Add</Button>
    </>
  )
}