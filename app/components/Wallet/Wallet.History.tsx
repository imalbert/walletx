import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { List, useTheme } from 'react-native-paper'
import { LogModelType } from '../../model/LogRecord'

import { LogItem } from '../log-item'

interface Props {
  title: string,
  description: string,
  logs: LogModelType[],
  isItToday?: boolean,
}

// log-item
// record-day
// record-month

export const WalletHistory: React.FC<Props> = observer(({
  title,
  description,
  logs,
  isItToday = false,
}) => {
  const theme = useTheme()
  const [isExpanded, toggleExpand] = useState(isItToday)
  let controls = isExpanded
    ? {
      expanded: isExpanded,
      onPress: () => toggleExpand(!isExpanded)
    }: {}

  return (
    <List.Section theme={theme}>
      <List.Accordion {...controls}
        title={`${isItToday ? 'Today, ' : ''}${title}`}
        titleStyle={{ fontSize: 24 }}
        description={description}
      >
        {logs.map((log, idx) =>
          <LogItem
            log={log}
            key={`wallet.history.${title}-log-${idx}`}
          />
        )}
      </List.Accordion>
    </List.Section>
  )
})
