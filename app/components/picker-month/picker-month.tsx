import React, { useState } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import {
  IconButton,
  Text,
  useTheme,
  TouchableRipple,
  Theme,
} from 'react-native-paper'

import { useStore } from '../../model/Root'

interface Props {
  data: string[],
  currentMonth?: string,
}
export const PickerMonth: React.FC<Props> = ({
  data,
  currentMonth = data[data.length - 1], // MMM YYYY format
}) => {
  const theme = useTheme()
  const { app } = useStore()
  console.log(app.month)
  const [current, changeCurrent] = useState(app.month)

  let prev = null
  if (data.indexOf(app.month) < 0) {
    data.push(current)
  }
  console.log(data, data.indexOf(app.month))
  const monthSeries = data.reduce((series, month) => {
    if (!prev) {
      series[month] = { prev: null, next: null }
    } else {
      series[prev].next = month
      series[month] = { prev, next: null }
    }
    prev = month
    return series
  }, {})

  console.log(monthSeries, current)
  const series = monthSeries[current] || {}
  console.log(series)
  return (
    <PickerMonthPure
      theme={theme}
      label={current}
      onPressPrev={series.prev ? () => {
        app.changeMonth(series.prev)
        changeCurrent(series.prev)
       } : null}
      onPressNext={series.next ? () => {
        app.changeMonth(series.next)
        changeCurrent(series.next)
       } : null}
    />
  )
}

export interface MonthYearSeries {
  theme: Theme,
  label: string,
  onPressPrev?: Function | null,
  onPressNext?: Function | null,
}
export const PickerMonthPure: React.FC<MonthYearSeries> = ({
  theme,
  label,
  onPressPrev,
  onPressNext,
}) => {
  return (
    <View style={{ ...styles.wrapper, ...styles.group }}>
      <View style={styles.group}>
        <IconButton icon="calendar"/>
        <Text style={styles.text}>
          {label}
        </Text>
      </View>

      <View style={styles.group}>
        <TouchableRipple
          disabled={!onPressPrev}
          onPress={() => onPressPrev()}>
          <IconButton
            icon="chevron-left"
            size={18}
            theme={theme}
          />
        </TouchableRipple>
        <TouchableRipple
          disabled={!onPressNext}
          onPress={() => onPressNext()}>
          <IconButton
            icon="chevron-right"
            size={18}
            theme={theme}
          />
        </TouchableRipple>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  }
})