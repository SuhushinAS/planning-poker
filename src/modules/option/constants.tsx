import {Coffee} from 'modules/option/components/Coffee';
import React, {ReactNode} from 'react';

export enum OptionType {
  coffee = -3,
  reset = -1,
  unsure = -2,
}

export const optionTitleMap: Record<OptionType, ReactNode> = {
  [OptionType.coffee]: <Coffee />,
  [OptionType.reset]: '\u00A0',
  [OptionType.unsure]: '?',
};
