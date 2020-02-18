import React, { useState } from 'react'

import { LogModelType } from '../model/LogRecord'
import { LogForm } from './LogForm'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { clone, applySnapshot } from 'mobx-state-tree'

interface Props {
  log: LogModelType,
}

export const LogFormEdit: React.FC<Props> = ({ log }) => {
  const navigation = useNavigation()
  const [updatedLog] = useState(clone(log))

  const onEdit = () => {
    applySnapshot(log, updatedLog)
    navigation.goBack()
  }

  return (
    <>
    <LogForm log={updatedLog} />
    <Button onPress={onEdit}>Edit</Button>
    </>
  )
}