import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { List, useTheme, Theme } from 'react-native-paper'
import { LogModelType } from '../../model/LogRecord'

import { LogItem } from '../log-item'

interface Props {
  title: string,
  description: string,
  logs: LogModelType[],
  isItToday?: boolean,
}
export const RecordDay: React.FC<Props> = observer(({
  isItToday = false,
  ...props
}) => {
  const theme = useTheme()
  const [isExpanded, toggleExpand] = useState(isItToday)
  let controls = isExpanded
    ? {
      expanded: isExpanded,
      onPress: () => toggleExpand(!isExpanded)
    }: {}

  return (
    <RecordDayPure
      theme={theme}
      controls={controls}
      isItToday={isItToday}
      {...props}
    />
  )
})

interface PureProps {
  theme: Theme,
  controls: any,
}
export const RecordDayPure: React.FC<PureProps & Props> = ({
  theme,
  controls,
  isItToday,
  title,
  description,
  logs,
}) => {
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
            key={`record-day.${title}-log-${idx}`}
          />
        )}
      </List.Accordion>
    </List.Section>
  )
}
