import {collection, onSnapshot} from 'firebase/firestore';
import {useFirebaseFirestoreContext} from 'modules/firebase/components/FirebaseFirestore';
import {TOptionSet} from 'modules/option/types';
import {useEffect, useState} from 'react';

export const useOptionSetList = () => {
  const firebaseFirestore = useFirebaseFirestoreContext();
  const [optionSetList, setOptionSetList] = useState<TOptionSet[]>();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firebaseFirestore, 'optionSet'), (snap) => {
      setOptionSetList(snap.docs.map((doc) => doc.data() as TOptionSet));
    });

    return unsubscribe;
  }, [firebaseFirestore]);

  return optionSetList;
};
