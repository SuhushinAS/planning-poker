import {Query, QueryConstraint} from '@firebase/firestore';
import {query} from 'firebase/firestore';
import {useMemo} from 'react';

export const useQuery = (q: Query, queryConstraint: QueryConstraint) => {
  return useMemo(() => query(q, queryConstraint), [q, queryConstraint]);
};
