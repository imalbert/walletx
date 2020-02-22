import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { TextInput, Text, Chip, IconButton } from 'react-native-paper'
import { LogModelType, LOG_CATEGORY, LOG_TYPES } from '../model/LogRecord'
import { View, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

interface Props {
  log: LogModelType,
}

export const LogForm: React.FC<Props> = observer(({ log }) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const logTypes = Object.values(LOG_TYPES)
  const logCateg = Object.values(LOG_CATEGORY)

  const onChangeCalendar = (_, selectedDate) => {
    setShowCalendar(Platform.OS === 'ios' ? true : false)
    const currentDate = selectedDate || log.date

    log.changeDate(currentDate)
  }

  return (
    <>
    <Text>Type</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      {logTypes.map(type => (
        <Chip
          style={{ marginRight: 8, marginBottom: 8 }}
          textStyle={{ fontSize: 15 }}
          key={`log-type-${type}`}
          selected={log.type === type}
          mode="outlined"
          icon={type === LOG_TYPES.EXPENSE ? 'minus' : 'plus'}
          onPress={() => log.changeType(type)}>
          {type.toLowerCase()}
        </Chip>
      ))}
    </View>

    <TextInput
      label="Amount"
      keyboardType="numeric"
      value={isNaN(log.amount) || log.amount === 0 ? '' : log.amount.toString()}
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
          style={{ marginRight: 8, marginBottom: 8 }}
          textStyle={{ fontSize: 15 }}
          key={`log-categ-${categ}`}
          selected={log.category === categ}
          mode="outlined"
          onPress={() => log.changeCategory(categ)}>
          {categ.toLocaleLowerCase()}
        </Chip>
      ))}
    </View>
    </>)}

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>
        Date {log.date.toLocaleDateString()}
      </Text>
      <IconButton
        icon="calendar-text"
        size={20}
        onPress={() => setShowCalendar(true)}
      />
      <Text>
        Time {log.date.toLocaleTimeString()}
      </Text>
      <IconButton
        icon="clock"
        size={20}
        onPress={() => setShowCalendar(true)}
      />
    </View>

    {showCalendar && (
      <DateTimePicker
        value={log.date}
        is24Hour={true}
        onChange={onChangeCalendar}
      />
    )}
    </>
  )
})