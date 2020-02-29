import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  List,
  Text,
  Button,
  TouchableRipple,
  useTheme,
  Theme
} from 'react-native-paper'

import { LogModelType, LOG_CATEGORY_ICONS } from '../../model/LogRecord'

import { Currency } from '../currency'

interface Props {
  log: LogModelType
}
export const LogItem: React.FC<Props> = ({ log }) => {
  const navigation = useNavigation()
  const theme = useTheme()
  const [isEditing, toggleEdit] = React.useState(false)
  const props = {
    log,
    isEditing,
    toggleEdit,
    theme,
    navigation
  }

  return <LogItemPure {...props} />
}

interface Pure {
  log: LogModelType,
  isEditing?: boolean,
  toggleEdit?: Function,
  theme: Theme,
  navigation: any,
}
export const LogItemPure: React.FC<Pure> = ({
  log,
  toggleEdit,
  isEditing = false,
  theme,
  navigation
}) => (
  <View>
    <TouchableRipple
      theme={theme}
      onPress={() => toggleEdit(!isEditing)}
      onLongPress={() => toggleEdit(!isEditing)}>
      <List.Item
        title={log.category}
        left={props =>
          <List.Icon
            {...props}
            icon={LOG_CATEGORY_ICONS[log.category]}
          />
        }
        right={props =>
          <Currency {...props}>
            {log.amount.toString()}
          </Currency>
        }
      />
    </TouchableRipple>

    {isEditing &&
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button onPress={() => toggleEdit(false)}>
          <Text>Cancel</Text>
        </Button>
        <Button onPress={() => { log.remove() }}>
          <Text>Remove</Text>
        </Button>
        <Button onPress={() => { navigation.navigate('WalletActions', { log }) }}>
          <Text>Edit</Text>
        </Button>
      </View>
    }
  </View>
)
