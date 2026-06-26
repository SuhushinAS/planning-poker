import { TValue } from 'src/modules/common/lib/types';

export const getNextItem = <T extends TValue>(list: T[], index: number) => {
  return list[(index + 1) % list.length];
};
