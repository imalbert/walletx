import { useContext, createContext } from 'react'
import { types, onSnapshot, Instance } from 'mobx-state-tree'

import { Record } from './LogRecord'

const WalletModel = types.model({
  record: Record,
})

export const rootStore = WalletModel.create({
  record: {},
})

onSnapshot(rootStore, snap => console.info('Snap: ', snap))

export type RootInstance = Instance<typeof WalletModel>
const RootStoreCtx = createContext<null | RootInstance>(null)

export const Provider = RootStoreCtx.Provider
export const useStore = () => useContext(RootStoreCtx)