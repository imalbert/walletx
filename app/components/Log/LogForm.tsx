import React, { useRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { ScrollView, View, StyleSheet, Platform } from 'react-native'
import { IconButton, Colors, TextInput, Text } from 'react-native-paper'

import { LOG_CATEGORY, LOG_CATEGORY_ICONS, LOG_TYPES, LogModelType } from '../../model/LogRecord'
import { TouchableOpacity } from 'react-native-gesture-handler'

const capitalize = (s: string): string => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

interface Props {
  log: LogModelType,
}

export const LogForm: React.FC<Props> = observer(({ log }) => {
  const amountInput = useRef(null)
  const categScroll = useRef(null)
  const dateScroll = useRef(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const logTypes = Object.values(LOG_TYPES)

  // is there a better way to create array from number???
  const daysArray = []
  const today = new Date().getDate()
  let currentDay = today - 7
  do { daysArray.push(currentDay++) } while (currentDay <= today)

  const onChangeCalendar = (_, selectedDate) => {
    setShowCalendar(Platform.OS === 'ios' ? true : false)
    const currentDate = selectedDate || log.date

    log.changeDate(currentDate)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (amountInput.current) { amountInput.current.focus() }
      if (dateScroll.current) { dateScroll.current.scrollTo({ x: 1000, y: 0, animated: false }) }
      if (categScroll.current) {
        const offset = 1
        const logCategoryIdx = Object.values(LOG_CATEGORY).indexOf(LOG_CATEGORY[log.category]) - offset
        categScroll.current.scrollTo({ x: logCategoryIdx * 90, y: 0, animated: false })
      }
    }, 1)
    return () => { clearTimeout(timeout) }
  }, [amountInput])

  return (
    <>
    <TextInput
      ref={amountInput}
      label={capitalize(log.type)}
      style={styles.textInput}
      keyboardType="numeric"
      value={`${isNaN(log.amount) || log.amount === 0 ? '' : log.amount.toString()}`}
      onChangeText={text => { log.changeAmount(parseInt(text)) }}
    />
    <View style={styles.categView}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={categScroll}>
        {Object.values(LOG_CATEGORY).map(categ => {
          return (
            <TouchableOpacity key={`logform-category-${categ}`}
              style={styles.categItem} onPress={() => { log.changeCategory(categ); amountInput.current.blur() }}>
              <>
                <IconButton
                  icon={LOG_CATEGORY_ICONS[categ]}
                  color={Colors.grey100}
                  size={36}
                  style={{
                    backgroundColor: (log.type === LOG_TYPES.INCOME && log.category === categ)
                      ? Colors.green500
                      : (log.type === LOG_TYPES.EXPENSE && log.category === categ)
                        ? Colors.red500
                        : Colors.grey300
                  }}
                />
                <Text style={{ color: Colors.grey700 }}>{capitalize(categ)}</Text>
              </>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
    <View style={styles.datesView}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={dateScroll}  style={{ backgroundColor: Colors.grey100 }}>
        {daysArray.map(date => {
          return (
            <TouchableOpacity key={`logform-category-${date}`} style={styles.datesItemWrap}
              onPress={() => {
                const selectedDate = new Date(log.date.getFullYear(), log.date.getMonth(), date)
                log.changeDate(selectedDate)
              }}>
              <View style={{
                ...styles.datesItem,
                backgroundColor: log.date.getDate() === date ? Colors.indigo500 : Colors.indigo100
              }}>
                <Text style={{ color: Colors.grey100, fontSize: 18 }}>{date}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <View style={{ alignItems: 'baseline', justifyContent: 'flex-start' }}>
        <Text style={{ color: Colors.grey700, fontSize: 24 }}>February</Text>
        <Text style={{ color: Colors.grey600, fontSize: 12 }}>2020</Text>
      </View>
      <IconButton
        icon="calendar-text"
        size={24}
        color={Colors.grey700}
        style={{ marginTop: -8 }} />
    </View>
    </>
  )
})

const styles = StyleSheet.create({
  textInput: { height: 96, fontSize: 24, marginLeft: 16, marginTop: 8, backgroundColor: 'transparent' },
  categView: { height: 96, marginTop: 8 },
  categItem: { height: 96, width: 90, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  datesView: { height: 84, marginTop: 8, flexDirection: 'row', alignItems: 'center' },
  datesItemWrap: { width: 66, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  datesItem: { width: 42, height: 42, backgroundColor: Colors.indigo500, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' },
})
