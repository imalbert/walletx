import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { List, Text, Button, TouchableRipple } from 'react-native-paper'
import { LogModelType, LOG_CATEGORY_ICONS } from '../../model/LogRecord'
import { currencyFmt } from '../../utils/format'

interface Props {
  title: string,
  description: string,
  logs: LogModelType[],
  isItToday?: boolean,
}

export const WalletHistory: React.FC<Props> = observer(({
  title,
  description,
  logs,
  isItToday = false,
}) => {
  const navigation = useNavigation()
  let controls = isExpanded
    ? {
      expanded: isExpanded,
      onPress: () => toggleExpand(!isExpanded)
    }: {}
  var [isExpanded, toggleExpand] = useState(isItToday)

  return (
    <List.Section>
      <List.Accordion {...controls}
        title={`${isItToday ? 'Today, ' : ''}${title}`}
        titleStyle={{ fontSize: 24 }}
        description={description}
      >
        {logs.map((log, idx) => {
          // const [isEditing, toggleEdit] = React.useState(false)

          return (
            <View key={`wallet.history.${title}-log-${idx}`}>
            {/* <TouchableRipple
              onPress={() => toggleEdit(false)}
              onLongPress={() => toggleEdit(!isEditing)}> */}
            <List.Item
              title={log.category}
              left={props => <List.Icon {...props} icon={LOG_CATEGORY_ICONS[log.category]} />}
              right={props => <Amount {...props}>{currencyFmt(log.amount)}</Amount>}
            />
            {/* </TouchableRipple> */}
            {/* {isEditing &&
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button onPress={() => toggleEdit(false)}>Cancel</Button>
              <Button onPress={() => { log.remove() }}>Remove</Button>
              <Button onPress={() => { navigation.navigate('WalletActions', { log }) }}>Edit</Button>
            </View> */
            }
            {<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button onPress={() => { log.remove() }}>Remove</Button>
              <Button onPress={() => { navigation.navigate('WalletActions', { log }) }}>Edit</Button>
            </View>
            }
            </View>
          )
        })}
      </List.Accordion>
    </List.Section>
  )
})

const LogDay

const Amount = ({ children, color, style = {} }) => (
  <Text style={{ fontSize: 18, textAlignVertical: 'center', ...style, color , }}>
    { children }
  </Text>
)