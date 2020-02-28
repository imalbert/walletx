import { DateTime as dt } from 'luxon'
// import * as Localization from 'expo-localization'

export const dateFmt = (
  date: string,
  format: string = 'LLL dd'
): string => {
  const fromDate = dt.fromISO(date)

  return fromDate.toFormat(format)
}

export const currencyFmt = (num, opts = { currency: 'PHP' }) => {
  return `${opts.currency} ${num}`
}

export const capitalize = (s: string): string => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}
