import { types } from 'mobx-state-tree'
import {
  dt,
  MMM_DD,
} from '../utils/date'

export const AppOptions = types.model('Theme')
  .props({
    theme: types.string,
    month: types.string,
  })
  .actions(self => ({
    toggleTheme: () => {
      self.theme = self.theme === 'light' ? 'dark' : 'light'
    },
    changeMonth: (newMonth: string) => {
      self.month = newMonth
    },
  }))
  .views(self => ({
    getMonthDateObj: () => dt
      .fromFormat(self.month, MMM_DD)
      .toJSDate()
  }))