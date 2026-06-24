import { GetUnion } from 'src/modules/common/lib/GetUnion';

export const getIsObjectValue = <T extends Record<string, unknown>>(object: T) => {
  return (value: unknown): value is GetUnion<T> => {
    return Object.values(object).includes(value);
  };
};
