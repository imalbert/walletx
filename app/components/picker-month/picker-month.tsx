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
  const monthYearSeries = data.reduce((moyr, current) => {
    if (!prev) {
      moyr[current] = { prev: null, next: null }
    } else {
      moyr[prev].next = current
      moyr[current] = { prev, next: null }
    }
    prev = current
    return moyr
  }, {})

  const series = monthYearSeries[current] || {}
  return (
    <PickerMonthPure
      theme={theme}
      label={current}
      onPressPrev={series.prev ? () => changeCurrent(series.prev) : null}
      onPressNext={series.next ? () => changeCurrent(series.next) : null}
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