import {ref} from 'firebase/database';
import {useDatabaseContext} from 'modules/firebase/components/Database';
import {useMemo} from 'react';

export const useDbRef = (path?: string) => {
  const database = useDatabaseContext();

  return useMemo(() => ref(database, path), [database, path]);
};
