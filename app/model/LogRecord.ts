import {
  types,
  getParent,
  destroy,
  Instance,
  SnapshotIn,
} from 'mobx-state-tree'

export enum LOG_TYPES { EXPENSE = 'EXPENSE', INCOME = 'INCOME' }
export enum LOG_CATEGORY { FOOD = 'FOOD', HOUSEHOLD = 'HOUSEHOLD' }
export enum RECORD_ACCOUNT { CASH_IN_HAND = 'CASH_IN_HAND' }
export enum RECORD_ACTIONS { ADD = 'RECORD_ADD', RM = 'RECORD_RM' }

export const Log = types.model('Log')
  .props({
    amount: types.number,
    category: types.string,
    date: types.Date,
    type: types.string,
  })
  .views(self => ({}))
  .actions(self => ({
    changeAmount(newAmount: number) { self.amount = newAmount },
    changeCategory(newCategory: LOG_CATEGORY) {
      self.category = newCategory
    },
    changeDate(newDate: Date) { self.date = newDate },
    changeType(newType: LOG_TYPES) { self.type = newType },
    remove() {
      getParent(self, 2).remove(self)
    }
  }))

const isExpense = (log: LogModelType) => log.type === LOG_TYPES.EXPENSE
const calcBalance = (
  log:     LogModelType, 
  balance: number, 
  action:  RECORD_ACTIONS): number => {
  switch(action) {
    case RECORD_ACTIONS.ADD: {
      return isExpense(log)
        ? balance - log.amount
        : balance + log.amount
    }
    case RECORD_ACTIONS.RM: {
      return isExpense(log)
        ? balance + log.amount
        : balance - log.amount
    }
    default:
      return balance
  }
}

export const Record = types.model('Record')
  .props({
    account: types.optional(types.string, RECORD_ACCOUNT.CASH_IN_HAND),
    balance: types.optional(types.number, 0),
    logs: types.optional(types.array(Log), []),
  })
  .actions(self => {
    return {
      add(log: LogModelType) {
        self.logs.push(log)
        self.balance = calcBalance(log, self.balance, RECORD_ACTIONS.ADD)
      },
      remove(log: LogModelType) {
        self.balance = calcBalance(log, self.balance, RECORD_ACTIONS.RM)
        destroy(log)
      },
      clear() {
        self.logs.forEach((log) => log.remove())
      },
    }
  })

export type RecordModelType = Instance<typeof Record>
export type LogModelType = Instance<typeof Log>