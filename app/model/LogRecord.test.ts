import {
  getSnapshot, IJsonPatch, onPatch,
} from 'mobx-state-tree'

import {
  Log,
  Record,
  LogModelType,
  LOG_TYPES,
  LOG_CATEGORY,
  RECORD_ACCOUNT,
  RecordModelType,
} from './LogRecord'

const DEFAULT_DATE = new Date(1581819204151)
const DEFAULT_BALANCE = 1000
const DEFAULT_ACCOUNT = 'CASH_IN_HAND'
const DEFAULT_LOG_AMOUNT = 500
const DEFAULT_LOG_CATEGORY = LOG_CATEGORY.FOOD
const DEFAULT_LOG_TYPE = LOG_TYPES.EXPENSE
const buildLogObj = (overrides?): LogModelType => ({
  amount: DEFAULT_LOG_AMOUNT,
  category: DEFAULT_LOG_CATEGORY,
  date: DEFAULT_DATE,
  type: DEFAULT_LOG_TYPE,
  ...overrides,
})

describe('Log Model', () => {
  
  it('can create an instance', () => {
    const log = Log.create(buildLogObj())
    
    expect(getSnapshot(log)).toMatchSnapshot()
  })
  
  describe('actions', () => {
    let log: LogModelType
    let patches: Array<IJsonPatch>
  
    beforeEach(() => {
      patches = []
      log = Log.create(buildLogObj())
  
      onPatch(log, snapshot => patches.push(snapshot))
    })
    afterEach(() => { expect(patches).toMatchSnapshot() })

    it('can update a log', () => {
      log.changeAmount(999)
      log.changeCategory(LOG_CATEGORY.HOUSEHOLD)
      log.changeDate(new Date(1581819204152))
      log.changeType(LOG_TYPES.INCOME)

      expect(getSnapshot(log)).toMatchSnapshot()
    })
  })
})

describe('Records Model', () => {
  it('can create a log record with defaults', () => {
    const record_with_defaults = Record.create()

    expect(getSnapshot(record_with_defaults)).toMatchSnapshot()
  })

  it('can create a log record with defaults', () => {
    const record_with_props = Record.create({
      balance: DEFAULT_BALANCE,
      logs: [Log.create(buildLogObj())],
    })

    expect(getSnapshot(record_with_props)).toMatchSnapshot()
  })

  describe('actions', () => {
    let record: RecordModelType
    let patches: Array<IJsonPatch>

    beforeEach(() => {
      patches = []
      record = Record.create({ balance: DEFAULT_BALANCE })

      onPatch(record, snapshot => patches.push(snapshot))
    })
    afterEach(() => { expect(patches).toMatchSnapshot() })

    it('can record a log', () => {
      record.add(Log.create(buildLogObj()))
      record.add(Log.create(buildLogObj({ type: LOG_TYPES.INCOME })))
    })

    it('can remove all logs', () => {
      record.add(Log.create(buildLogObj()))
      record.add(Log.create(buildLogObj()))
      const totalExpenses = DEFAULT_LOG_AMOUNT * 2

      expect(record.logs.length).toBe(2)
      expect(record.balance).toBe(DEFAULT_BALANCE - totalExpenses)

      record.clear()
      expect(record.logs.length).toBe(0)
      expect(record.balance).toBe(DEFAULT_BALANCE)
    })
  })
})
