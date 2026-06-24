import { ReactNode } from 'react';
import { SvgIcon } from 'src/modules/common/ui/SvgIcon';
import { Option, TOption } from 'src/modules/option/lib/types';

export const optionTitleMap: Record<TOption, ReactNode> = {
  [Option.coffee]: <SvgIcon name="coffee" />,
  [Option.reset]: '\u00A0\u00A0\u00A0',
  [Option.unsure]: <SvgIcon name="question" />,
};
