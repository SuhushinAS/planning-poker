import { TValue } from 'src/modules/common/lib/types';

export const getIndexMap = <T extends TValue = TValue>(list: T[]) => {
  return Object.fromEntries<number>(list.map((value, index) => [value, index]));
};
