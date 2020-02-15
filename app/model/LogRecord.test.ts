import { LogRecord } from './LogRecord'

describe('LogRecord Model', () => {
  const dateTest = new Date()

  it('can create an instance', () => {
    LogRecord.create({
      amount: 123,
      category: 'Food',
      date: dateTest,
      type: 'Expense',
    })
  })

})