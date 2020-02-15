import React, { useState } from 'react'

import { TextInput, Button } from 'react-native-paper'

export function LogForm() {
  const [amt, setAmt] = useState(0)
  const [cat, setCat] = useState('Food')
  const [date, setDate] = useState(new Date())
  const onButtonPress = () => {
    console.info('save form')
  }

  return (
    <>
    <TextInput
      label="Amount"
      keyboardType="numeric"
      value={amt.toString()}
      onChangeText={text => setAmt(parseInt(text))}
    />
    <TextInput
      label="Category"
      value={cat}
      onChangeText={text => setCat(text)}
    />
    <TextInput
      label="Date"
      value={date.toTimeString()}
      onChangeText={() => new Date()}
    />
    <Button icon="save" onPress={onButtonPress}>
      Save
    </Button>
    </>
  )
}