import {onSnapshot} from 'firebase/firestore';
import {useCollectionRef} from 'modules/firebase/lib/useCollectionRef';
import {TOptionSet} from 'modules/option/types';
import {useEffect, useState} from 'react';

export const useOptionSetList = () => {
  const [optionSetList, setOptionSetList] = useState<TOptionSet[]>();
  const optionSetCollectionRef = useCollectionRef('optionSet');

  useEffect(() => {
    return onSnapshot(optionSetCollectionRef, (snap) => {
      setOptionSetList(snap.docs.map((doc) => doc.data() as TOptionSet));
    });
  }, [optionSetCollectionRef]);

  return optionSetList;
};
