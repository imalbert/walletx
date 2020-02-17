import React, { useState } from 'react'

import { Log } from '../model/LogRecord'
import { LogForm } from './LogForm'
import { useStore } from '../model/Root'
import { Button } from 'react-native-paper'

interface Props {
}

export const LogFormAdd: React.FC<Props> = () => {
  const [newLog, resetLog] = useState(Log.create())
  const { record } = useStore()
  const onAdd = () => {
    record.add(newLog)
    resetLog(Log.create())
  }

  return (
    <>
    <LogForm log={newLog} />
    <Button onPress={onAdd}>Add</Button>
    </>
  )
}