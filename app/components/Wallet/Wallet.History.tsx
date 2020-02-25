import React from 'react'

import { List, Text } from 'react-native-paper'
import { LogModelType, LOG_CATEGORY_ICONS } from '../../model/LogRecord'

interface Props {
  title: string,
  description: string,
  logs: LogModelType[],
}

export const WalletHistory: React.FC<Props> = ({
  title,
  description,
  logs,
}) => {
  return (
    <List.Section>
      <List.Accordion expanded
        title={title}
        titleStyle={{ fontSize: 24 }}
        description={description}>
        {logs.map(({ category, amount }) => (
          <List.Item
            title={category}
            left={props => <List.Icon {...props} icon={LOG_CATEGORY_ICONS[category]} />}
            right={props => <Amount {...props}>${amount}.00</Amount>}
          />
        ))}
      </List.Accordion>
    </List.Section>
  )
}

const Amount = ({ children, color, style = {} }) => (
  <Text style={{ fontSize: 18, textAlignVertical: 'center', ...style, color , }}>
    { children }
  </Text>
)