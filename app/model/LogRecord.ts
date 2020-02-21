import {
  types,
  getParent,
  destroy,
  Instance,
} from 'mobx-state-tree'

export enum LOG_TYPES { EXPENSE = 'EXPENSE', INCOME = 'INCOME' }
export enum LOG_CATEGORY {
  FOOD      = 'FOOD',
  HOUSEHOLD = 'HOUSEHOLD',
  TRANSPORT = 'TRANSPORT',
  HEALTH    = 'HEALTH',
  APPAREL   = 'APPAREL',
  SOCIAL    = 'SOCIAL',
  EDUCATION = 'EDUCATION',
  GIFT      = 'GIFT',
  OTHER     = 'OTHER',
  INCOME    = 'INCOME',
}
export enum RECORD_ACCOUNT { CASH_IN_HAND = 'CASH_IN_HAND' }
export enum RECORD_ACTIONS { ADD = 'RECORD_ADD', RM = 'RECORD_RM' }

// TODOs:
// Log by itself allows type: INCOME and category: FOOD
// Look for log model solution (maybe hooks)
export const Log = types.model('Log')
  .props({
    amount: types.optional(types.number, 0),
    category: types.optional(types.string, LOG_CATEGORY.FOOD),
    date: types.optional(types.Date, new Date()),
    type: types.optional(types.string, LOG_TYPES.EXPENSE),
  })
  .views(self => ({
    get isExpense() {
      return self.type === LOG_TYPES.EXPENSE
    },
    get isIncome() {
      return self.type === LOG_TYPES.INCOME
    },
  }))
  .actions(self => ({
    changeAmount(newAmount: number) { self.amount = newAmount },
    changeCategory(newCategory: LOG_CATEGORY) {
      self.category = newCategory
    },
    changeDate(newDate: Date) { self.date = newDate },
    changeType(newType: LOG_TYPES) {
      self.type = newType
      self.category = self.isIncome
        ? LOG_CATEGORY.INCOME
        : LOG_CATEGORY.FOOD
    },
    remove() {
      getParent(self, 2).remove(self)
    }
  }))

export const Record = types.model('Record')
  .props({
    account: types.optional(types.string, RECORD_ACCOUNT.CASH_IN_HAND),
    logs: types.optional(types.array(Log), []),
  })
  .views(self => ({
    getBalance() {
      return self.logs.reduce((total, log) => {
        return log.isExpense
          ? total - log.amount
          : total + log.amount
      }, 0)
    },
    getLogsByMonth(today: Date = new Date()) {
      const monthNow = today.getMonth()
      const yearNow = today.getFullYear()

      return self.logs.filter(item => (
        item.date.getMonth() === monthNow
        && item.date.getFullYear() === yearNow
      ))
    },
  }))
  .views(self => ({
    getLogsByDayOfMonth(today: Date = new Date()) {
      const logs = self.getLogsByMonth(today)

      return logs.reduce((coll, item) => {
        const options = { month: 'short', day: 'numeric' }
        const prop = item.date.toLocaleDateString('en-US', options)

        if (coll[prop]) {
          coll[prop].push(item)
        } else {
          coll[prop] = [item]
        }

        return coll
      }, {})
    }
  }))
  .actions(self => {
    return {
      add(log: LogModelType) {
        self.logs.push(log)
      },
      remove(log: LogModelType) {
        destroy(log)
      },
      clear() {
        self.logs.forEach((log) => log.remove())
      },
    }
  })

export type RecordModelType = Instance<typeof Record>
export type LogModelType = Instance<typeof Log>