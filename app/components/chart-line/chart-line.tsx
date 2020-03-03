import React, { useState } from 'react'

import { Svg, Polyline, Text as SvgText, TSpan } from 'react-native-svg'
import { View, Text } from 'react-native'

import { toSvgPolylinePts, toSvgTSpanPts } from '../../utils/svg'

const dummyData = {
  data: [
    { day: '0', total: 400 },
    { day: '1', total: 220 },
    { day: '2', total: 0 },
    { day: '3', total: 400 },
    { day: '4', total: 150 },
    { day: '5', total: 75 },
    { day: '6', total: 0 },
    { day: '7', total: 400 },
  ],
}
export const Chart = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const points = toSvgPolylinePts({ ...dummyData, width, height, topData: 400, paddingX: 20, paddingY: 40 })
  const labels = toSvgTSpanPts({ ...dummyData, width, height })

  console.log('w: ', width, 'h: ', height)
  console.log('points: ', points)
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1,
        margin: 20,
      }}
      onLayout={(el) => {
        if (el.nativeEvent) {
          setWidth(el.nativeEvent.layout.width)
          setHeight(el.nativeEvent.layout.height)
        }
      }}
    >
      <Line
        points={points}
        labels={labels}
        width={width}
        height={height}
      />
    </View>
  )
}

interface Props {
  points: string,
  labels: any,
  width: number,
  height: number,
}
export const Line = ({
  points: polyPoints,
  labels,
  width = 0,
  height = 0,
}: Props) => {
  if (!width || !height) {
    return (
      <Text>Loading</Text>
    )
  }
    // console.log(polyPoints)
  return (
    <Svg width={width} height={height}>
      <Polyline
        // points="0,407 240,0"
        points={polyPoints}
        // points="10%,10% 20%,20%"
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
      <SvgText
        y={height-20}
        dx="0 25 25 25 25 25 25 25 25"
        textAnchor="middle"
        fontSize="16"
      >
        <TSpan fill="white">0</TSpan>
        <TSpan fill="white">1</TSpan>
        <TSpan fill="white">2</TSpan>
        <TSpan fill="white">3</TSpan>
        <TSpan fill="white">4</TSpan>
        <TSpan fill="white">5</TSpan>
        <TSpan fill="white">6</TSpan>
        <TSpan fill="white">7</TSpan>
      </SvgText>
    </Svg>
  )
}