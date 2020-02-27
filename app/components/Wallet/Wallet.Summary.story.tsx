import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { WalletSummary } from './Wallet.Summary'

storiesOf('WalletSummary', module)
  .add('to Storybook', () => <WalletSummary balance={'1000'} />);
