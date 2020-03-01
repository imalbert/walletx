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

import { dateFmt, MMM_YYYY } from '../../utils'
import { useStore } from '../../model/Root'

interface Props {}
export const PickerMonth: React.FC<Props> = () => {
  const theme = useTheme()
  const { record, app } = useStore()
  const [selectedMonth, changeCurrent] = useState(app.month)
  const thisMonth = dateFmt(new Date().toISOString(), MMM_YYYY)
  const monthSeries = record.getMonthSeriesFromLogs(thisMonth)

  const series = monthSeries[selectedMonth] || {}
  return (
    <PickerMonthPure
      theme={theme}
      label={selectedMonth}
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