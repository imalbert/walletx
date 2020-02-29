import React, {
  useRef,
  useEffect,
} from 'react'
import { observer } from 'mobx-react'
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native'
import {
  IconButton,
  Colors,
  TextInput,
  Text,
  useTheme,
  Theme,
} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

import {
  LOG_CATEGORY,
  LOG_CATEGORY_ICONS,
  LOG_TYPES,
  LogModelType
} from '../../model/LogRecord'

const capitalize = (s: string): string => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

interface Props {
  log: LogModelType,
  onlyIncome?: boolean,
}

export const LogForm: React.FC<Props> = ({ log, onlyIncome }) => {
  const theme = useTheme()
  const endOfMonth = new Date(log.date.getFullYear(), log.date.getMonth() + 1, 0).getDate()
  const daysArray = []
  let currentDay = 1
  do { daysArray.push(currentDay++) } while (currentDay <= endOfMonth)

  return (
    <LogFormPure
      theme={theme}
      log={log}
      daysArray={daysArray}
      onlyIncome={onlyIncome}
    />
  )
}

interface PureProps {
  theme: Theme,
  log: LogModelType,
  daysArray: number[],
  onlyIncome?: boolean,
}
const LogFormPure: React.FC<PureProps> = observer(({
  theme = { colors: { background: 'white' }},
  log,
  daysArray,
  onlyIncome,
}) => {
  const amountInput = useRef(null)
  const categScroll = useRef(null)
  const dateScroll = useRef(null)
  const scrollTo = ({ scrollRef, index, x, animated }) => {
    scrollRef.current.scrollTo({ x: (index * x.width) + x.offset , y: 0, animated })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (amountInput.current) { amountInput.current.focus() }
      if (dateScroll.current) {
        scrollTo({
          x: { width: 66, offset: -10 },
          scrollRef: dateScroll,
          index: daysArray.indexOf(log.date.getDate()),
          animated: false,
        })
      }
      if (categScroll.current) {
        scrollTo({
          x: { width: 90, offset: 0 },
          scrollRef: categScroll,
          index: Object.values(LOG_CATEGORY).indexOf(LOG_CATEGORY[log.category]) - 1,
          animated: false,
        })
      }
    }, 1)
    return () => { clearTimeout(timeout) }
  }, [])

  const categories = onlyIncome ? [LOG_CATEGORY.INCOME] : Object.values(LOG_CATEGORY)

  return (
    <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={{ backgroundColor: theme.colors.background }}>
    <TextInput
      ref={amountInput}
      autoFocus dense theme={theme}
      style={{ ...styles.textInput, backgroundColor: theme.colors.background }}
      label={capitalize(log.type)}
      keyboardType="numeric"
      value={`${isNaN(log.amount) || log.amount === 0 ? '' : log.amount.toString()}`}
      onChangeText={text => { log.changeAmount(parseInt(text)) }}
    />
    <View style={styles.categView}>
      <ScrollView horizontal keyboardShouldPersistTaps="always" showsHorizontalScrollIndicator={false} ref={categScroll}>
        {categories.map(categ => {
          return (
            <TouchableOpacity key={`logform-category-${categ}`}
              style={styles.categItem}
              onPress={() => {
                log.changeCategory(categ)
                scrollTo({
                  x: { width: 90, offset: 0 },
                  scrollRef: categScroll,
                  index: Object.values(LOG_CATEGORY).indexOf(LOG_CATEGORY[log.category]),
                  animated: true,
                })
              }}>
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
                  theme={theme}
                />
                <Text style={{ color: Colors.grey700 }}>{capitalize(categ)}</Text>
              </>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
    <View style={styles.datesView}>
      <Text style={{ color: Colors.grey700, fontSize: 24, marginLeft: 16 }}>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][log.date.getMonth()]}
        {' ' + log.date.getFullYear()}
      </Text>
      <ScrollView horizontal keyboardShouldPersistTaps="always" showsHorizontalScrollIndicator={false} ref={dateScroll}>
        {daysArray.map(date => {
          return (
            <TouchableOpacity key={`logform-category-${date}`} style={styles.datesItemWrap}
              onPress={() => {
                const selectedDate = new Date(log.date.getFullYear(), log.date.getMonth(), date)
                log.changeDate(selectedDate)
                scrollTo({
                  x: { width: 66, offset: -10 },
                  scrollRef: dateScroll,
                  index: daysArray.indexOf(selectedDate.getDate()),
                  animated: true,
                })
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
    </View>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  textInput: { height: 80, fontSize: 24 },
  categView: { height: 96, marginTop: 8 },
  categItem: { height: 96, width: 90, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  datesView: { height: 84, marginTop: 8 },
  datesItemWrap: { width: 66, marginTop: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' },
  datesItem: { width: 42, height: 42, backgroundColor: Colors.indigo500, borderRadius: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' },
})
