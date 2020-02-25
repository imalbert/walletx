import { DateTime as dt } from 'luxon'
// import * as Localization from 'expo-localization'

export const dateFmt = (date: string): string => {
  const fromDate = dt.fromISO(date)

  return fromDate.toFormat('LLL dd')
}

export const currencyFmt = (num, opts = { currency: 'PHP' }) => {
  return `${opts.currency} ${num}`
}
