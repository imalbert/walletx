import React from 'react'

import { storiesOf } from '@storybook/react-native'

import { SidebarPure } from './sidebar'

storiesOf('Sidebar', module)
  .add('dark theme', () => (
    <SidebarPure
      onToggleTheme={() => {}}
      theme={{ dark: true, colors: { background: 'black' }}}
    />
  ))
  .add('light theme', () => (
    <SidebarPure
      onToggleTheme={() => {}}
      theme={{ dark: false, colors: { background: 'white' }}}
    />
  ))
