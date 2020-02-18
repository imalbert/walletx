import { useContext, createContext } from 'react'
import { types, onSnapshot, Instance } from 'mobx-state-tree'

import { Record } from './LogRecord'
import * as Storage from '../utils/storage'

const WalletModel = types.model({
  record: Record,
})

const ROOT_STATE_STORAGE_KEY = 'mitzy-app'

export async function setupRootStore() {
  let rootStore: Instance<typeof WalletModel>
  let data: any

  try {
    // get from storage the snapshot
    data = (await Storage.load(ROOT_STATE_STORAGE_KEY)) || {}
    console.info('Snapshot loaded', data)
    rootStore = WalletModel.create(data)
  } catch (e) {
    rootStore = WalletModel.create({})

    __DEV__ && console.error(e.message)
  }

  // storage.save on snapshot
  onSnapshot(rootStore, snapshot => {
    console.info('Snapshot: ', snapshot)
    Storage.save(ROOT_STATE_STORAGE_KEY, snapshot)
  })

  return rootStore
}

export type RootInstance = Instance<typeof WalletModel>
const RootStoreCtx = createContext<null | RootInstance>(null)

export const Provider = RootStoreCtx.Provider
export const useStore = () => useContext(RootStoreCtx)