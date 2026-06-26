import { ref } from 'firebase/database';
import { useMemo } from 'react';
import { useDatabaseContext } from 'src/modules/firebase/ui/Database';

export const useDbRef = (path?: string) => {
  const database = useDatabaseContext();

  return useMemo(() => ref(database, path), [database, path]);
};
