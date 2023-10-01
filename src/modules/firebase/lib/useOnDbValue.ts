import {DataSnapshot, DatabaseReference, onValue} from 'firebase/database';
import {useEffect} from 'react';

type UseOnDbValue = (dbRef: DatabaseReference, callback: (snap: DataSnapshot) => void) => void;

export const useOnDbValue: UseOnDbValue = (dbRef, callback) =>
  useEffect(() => onValue(dbRef, callback), [callback, dbRef]);
