import { types } from 'mobx-state-tree'

export const AppOptions = types.model('Theme')
  .props({
    theme: types.string,
  })
  .actions(self => ({
    toggleTheme: () => {
      self.theme = self.theme === 'light' ? 'dark' : 'light'
    }
  }))