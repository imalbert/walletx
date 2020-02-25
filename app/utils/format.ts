import { DateTime as dt } from 'luxon'

export const dateFmt = (date: string): string => {
  const fromDate = dt.fromISO(date)

  return fromDate.toFormat('LLL dd')
}
