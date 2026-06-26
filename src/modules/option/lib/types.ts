import { getIsObjectValue } from 'src/modules/common/lib/getIsObjectValue';
import { GetUnion } from 'src/modules/common/lib/GetUnion';

export type TOptionSet = {
  id: string;
  optionList: number[];
  title: string;
  titleKey: string;
};

export const Option = {
  coffee: -3,
  reset: -1,
  unsure: -2,
} as const;

export type TOption = GetUnion<typeof Option>;

export const isOption = getIsObjectValue(Option);
