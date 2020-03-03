import React, { useState } from 'react'

import { View, Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import { Line, Chart } from './chart-line'
import { Polyline } from 'react-native-svg'

storiesOf('Chart - Line', module)
  // .addDecorator(story => (
  //   <View style={{ width: 100, height: 100, backgroundColor: 'grey', borderColor: 'black', borderWidth: 1,  }}>
  //     {story()}
  //   </View>
  // ))
  .add('display data', () => (
    <Line />
  ))

const MyOtherChart = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  return (
    <View
      style={{ width: 100, height: 100, backgroundColor: 'grey', marginTop: 20 }}
      onLayout={(el) => {
        if (el.nativeEvent) {
          setWidth(el.nativeEvent.layout.width)
          setHeight(el.nativeEvent.layout.height)
        }
      }}
    >
      <Text style={{ fontSize: 24, color: 'black'}}>
        {`w: ${width}`}
      </Text>
      <Text style={{ fontSize: 24, color: 'black'}}>
        {`h: ${height}`}
      </Text>
    </View>
  )
}

storiesOf('test', module)
  .add('defined', () => {
    <MyOtherChart />
  })