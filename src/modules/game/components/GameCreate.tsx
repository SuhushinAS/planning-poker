import {addDoc, collection} from 'firebase/firestore';
import {useFirebaseAnonymContext} from 'modules/firebase/components/FirebaseAuthAnonymously';
import {useFirebaseFirestoreContext} from 'modules/firebase/components/FirebaseFirestore';
import {Form} from 'modules/form/components/Form';
import {GameCreateForm} from 'modules/game/components/GameCreateForm';
import {gamePath} from 'modules/game/constants';
import {TGame} from 'modules/game/types';
import {useOptionSetList} from 'modules/option/model/useOptionSet';
import {TOptionSet} from 'modules/option/types';
import React, {useCallback, useMemo} from 'react';
import {generatePath, useNavigate} from 'react-router';
import {DeepPartial} from 'redux';

type Props = {
  optionSetList: TOptionSet[];
};

export const GameCreateWithOptions = ({optionSetList}: Props) => {
  const navigate = useNavigate();
  const firebaseAnonym = useFirebaseAnonymContext();
  const firebaseFirestore = useFirebaseFirestoreContext();
  const defaultValues = useMemo(() => {
    const result: DeepPartial<TGame> = {
      title: '',
    };

    if (1 === optionSetList.length) {
      result.options = optionSetList[0].options;
    }

    return result;
  }, [optionSetList]);

  const onSubmit = useCallback(
    (values) => {
      addDoc(collection(firebaseFirestore, 'game'), {
        ...values,
        createDate: Date.now(),
        creatorId: firebaseAnonym.uid,
      }).then((game) => {
        navigate(generatePath(gamePath.item, {gameId: game.id}));
      });
    },
    [firebaseAnonym.uid, firebaseFirestore, navigate]
  );

  return (
    <Form defaultValues={defaultValues} onSubmit={onSubmit}>
      <GameCreateForm />
    </Form>
  );
};

export const GameCreate = () => {
  const optionSetList = useOptionSetList();

  if (optionSetList === undefined) {
    return null;
  }

  return <GameCreateWithOptions optionSetList={optionSetList} />;
};
