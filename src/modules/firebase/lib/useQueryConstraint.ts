import {DocumentData, Query, QueryConstraint} from '@firebase/firestore';
import {query} from 'firebase/firestore';
import {useMemo} from 'react';

export const useQueryConstraint = <T1 extends DocumentData = DocumentData, T2 extends DocumentData = DocumentData>(
  q: Query<T1, T2>,
  queryConstraint: QueryConstraint
) => {
  return useMemo(() => query(q, queryConstraint), [q, queryConstraint]);
};
