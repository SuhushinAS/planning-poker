import {Query, QueryConstraint} from '@firebase/firestore';
import {query} from 'firebase/firestore';
import {useMemo} from 'react';

export const useQueryConstraint = (q: Query, queryConstraint: QueryConstraint) => {
  return useMemo(() => query(q, queryConstraint), [q, queryConstraint]);
};
