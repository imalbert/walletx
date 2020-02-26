import { useContext, createContext } from 'react'
import { types, onSnapshot, Instance } from 'mobx-state-tree'

import { Record } from './LogRecord'
import { AppOptions } from './AppOptions'

import * as Storage from '../utils/storage'

const WalletModel = types.model({
  record: Record,
  app: AppOptions,
})

const ROOT_STATE_STORAGE_KEY = 'mitzy-app'

export async function setupRootStore() {
  let rootStore: Instance<typeof WalletModel>
  let data: any

  try {
    // get from storage the snapshot
    data = await Storage.load(ROOT_STATE_STORAGE_KEY) || { record: Record.create(), app: AppOptions.create({ theme: 'light' }) }
    console.info('Snapshot loaded', data)
    rootStore = WalletModel.create({ ...data, app: AppOptions.create({ theme: 'light' }) })
  } catch (e) {
    __DEV__ && console.error(e.message)

    rootStore = WalletModel.create({ record: Record.create(), app: AppOptions.create({ theme: 'light' }) })
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