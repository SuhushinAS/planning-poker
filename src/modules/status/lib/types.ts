import { GetUnion } from 'src/modules/common/lib/GetUnion';

export type TStatusStore = {
  [key: string]: TStatus | undefined;
};

export const Status = {
  error: 3,
  idle: 0,
  loading: 1,
  success: 2,
} as const;

export type TStatus = GetUnion<typeof Status>;

export type TStatusMap = {
  [key: string]: TStatus;
};
