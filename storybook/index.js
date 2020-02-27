import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

// import stories
configure(() => {
  require('../app/components/sidebar/sidebar.story')
  require('../app/components/currency/currency.story')
  require('../app/components/log-item/log-item.story')
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  port: 19000,
  host: "localhost",
  onDeviceUI: true,

  // More info at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#react-native-async-storage
  asyncStorage: require('react-native').AsyncStorage || null,
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
