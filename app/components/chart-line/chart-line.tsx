import React, { useState } from 'react'

import { Svg, Polyline, Text as SvgText, TSpan } from 'react-native-svg'
import { View, Text } from 'react-native'
import { useTheme, Colors } from 'react-native-paper'

import { toSvgPolylinePts, toSvgTSpanPts } from '../../utils/svg'

interface ChartProps {
  data?: { day: string, total: number }[],
  maxTotal: number,
}
export const Chart: React.FC<ChartProps> = ({ data, maxTotal }) => {
  const theme = useTheme()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const points = toSvgPolylinePts({
    data,
    width,
    height,
    topData: maxTotal,
    paddingX: 20,
    paddingY: 40,
  })
  const labels = toSvgTSpanPts({ data, width, height })

  // console.log(data)
  // console.log('w: ', width, 'h: ', height)
  // console.log('points: ', points, 'max ', maxTotal)
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
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
        stroke={theme.colors.primary}
        strokeWidth={'1'}
      />
    </View>
  )
}

interface Props {
  points: string,
  labels: any,
  width: number,
  height: number,
  stroke?: string,
  strokeWidth?: string,
}
export const Line = ({
  points: polyPoints,
  labels,
  width = 0,
  height = 0,
  stroke = 'white',
  strokeWidth = '1',
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
        points={polyPoints}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* <SvgText
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
      </SvgText> */}
    </Svg>
  )
}