import { useMemo } from 'react';
import { getMessage } from 'src/modules/locale/lib/getMessage';
import { useGetMessage } from 'src/modules/locale/lib/useGetMessage';

export const useMessage = (
  ...[id, value]: Parameters<ReturnType<typeof getMessage>>
): ReturnType<typeof getMessage> => {
  const getMessage = useGetMessage();

  return useMemo(() => getMessage(id, value), [getMessage, id, value]);
};
