import {ref} from 'firebase/database';
import {useDatabaseContext} from 'modules/firebase/components/Database';
import {useRef} from 'react';

export const useDbRef = (path?: string) => {
  const database = useDatabaseContext();
  const docRef = useRef(ref(database, path));

  return docRef.current;
};
