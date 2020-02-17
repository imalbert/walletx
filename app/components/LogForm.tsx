import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { TextInput } from 'react-native-paper'
import { LogModelType, LOG_CATEGORY } from '../model/LogRecord'

interface Props {
  log: LogModelType,
}

export const LogForm: React.FC<Props> = observer(({ log }) => {
  return (
    <>
    <TextInput
      label="Amount"
      keyboardType="numeric"
      value={log.amount.toString()}
      onChangeText={text => { log.changeAmount(parseInt(text)) }}
    />
    <TextInput
      label="Category"
      value={log.category}
      onChangeText={text => log.changeCategory(LOG_CATEGORY[text])}
    />
    <TextInput
      label="Date"
      value={new Date().toTimeString()}
      onChangeText={() => new Date()}
    />
    </>
  )
})