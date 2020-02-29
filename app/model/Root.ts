import { useContext, createContext } from 'react'
import { types, onSnapshot, Instance } from 'mobx-state-tree'

import { Record } from './LogRecord'
import { AppOptions } from './AppOptions'

import * as Storage from '../utils/storage'
import { dateFmt, MMM_YYYY } from '../utils'

const WalletModel = types.model({
  record: Record,
  app: AppOptions,
})

const ROOT_STATE_STORAGE_KEY = 'mitzy-app'

export async function setupRootStore() {
  let rootStore: Instance<typeof WalletModel>
  let data: any
  const defaultOpts = {
    theme: 'light',
    month: dateFmt(new Date().toISOString(), MMM_YYYY),
  }

  try {
    // get from storage the snapshot
    data = await Storage.load(ROOT_STATE_STORAGE_KEY)
      || {
        record: Record.create(),
        app: AppOptions.create(defaultOpts)
      }
    console.info('Snapshot loaded', data)
    rootStore = WalletModel.create({
      ...data,
      // override saved state with temporary app defaults
      // remove later when final
      app: AppOptions.create(defaultOpts),
    })
  } catch (e) {
    __DEV__ && console.error(e.message)

    rootStore = WalletModel.create({
      record: Record.create(),
      app: AppOptions.create(defaultOpts),
    })
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