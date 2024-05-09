import {SvgIcon} from 'modules/common/components/SvgIcon';
import React, {ReactNode} from 'react';

export enum OptionType {
  coffee = -3,
  reset = -1,
  unsure = -2,
}

export const optionTitleMap: Record<OptionType, ReactNode> = {
  [OptionType.coffee]: <SvgIcon name="coffee" />,
  [OptionType.reset]: '\u00A0',
  [OptionType.unsure]: <SvgIcon name="question" />,
};
