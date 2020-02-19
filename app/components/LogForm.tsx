import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { TextInput, Text, Chip } from 'react-native-paper'
import { LogModelType, LOG_CATEGORY, LOG_TYPES } from '../model/LogRecord'
import { View } from 'react-native'

interface Props {
  log: LogModelType,
}

export const LogForm: React.FC<Props> = observer(({ log }) => {
  const logTypes = Object.values(LOG_TYPES)
  const logCateg = Object.values(LOG_CATEGORY)

  return (
    <>
    <Text>Type</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      {logTypes.map(type => (
        <Chip
          key={`log-type-${type}`}
          selected={log.type === type}
          onPress={() => log.changeType(type)}>
          {type.toLowerCase()}
        </Chip>
      ))}
    </View>

    <TextInput
      label="Amount"
      keyboardType="numeric"
      mode="outlined"
      value={isNaN(log.amount) ? "0" : log.amount.toString()}
      onChangeText={text => { log.changeAmount(parseInt(text)) }}
    />

    {log.isExpense && (<>
    <Text>Category</Text>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
      }}>
      {logCateg.map(categ => (
        <Chip
          key={`log-categ-${categ}`}
          selected={log.category === categ}
          onPress={() => log.changeCategory(categ)}>
          {categ.toLocaleLowerCase()}
        </Chip>
      ))}
    </View>
    </>)}

    <TextInput
      label="Date"
      value={new Date().toTimeString()}
      mode="outlined"
      onChangeText={() => new Date()}
    />
    </>
  )
})