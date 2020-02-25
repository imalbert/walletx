import React from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../../model/Root'

import { View } from 'react-native'
import { WalletSummary } from './Wallet.Summary'
import { WalletHistory } from './Wallet.History'

export const WalletRecords: React.FC<{}> = observer(() => {
  const { record } = useStore()

  return (
    <View style={{ flex: 1 }}>
      <WalletSummary balance={record.getBalance().toString()} />
      <WalletHistory
        title={'Today, 24 Feb'}
        description={'+$500.00  -$250.00'}
        logs={record.logs}
      />
    </View>
  )
})
