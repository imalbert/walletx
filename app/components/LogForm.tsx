import * as React from 'react'
import { TextInput, Button } from 'react-native-paper'

export function RecordForm() {
  return (
    <>
    <TextInput
      label="Amount"
      value="0.00"
      onChangeText={text => {}}
    />
    <TextInput
      label="Category"
      value="Food"
      onChangeText={text => {}}
    />
    <Button>
      Save
    </Button>
    </>
  )
}