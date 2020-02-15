import { types } from 'mobx-state-tree'

export const LogRecord = types
  .model('LogRecord')
  .props({
    amount: types.number,
    category: types.string,
    date: types.Date,
    type: types.string,
  })
