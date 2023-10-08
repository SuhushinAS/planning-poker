import {addDoc, serverTimestamp} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useCollectionRef} from 'modules/firebase/lib/useCollectionRef';
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
  const anonymously = useAnonymouslyContext();
  const gameCollectionRef = useCollectionRef('game');
  const defaultValues = useMemo(() => {
    const result: DeepPartial<TGame> = {
      title: '',
    };

    if (1 === optionSetList.length) {
      result.optionList = optionSetList[0].optionList;
    }

    return result;
  }, [optionSetList]);

  const onSubmit = useCallback(
    (values) => {
      return addDoc(gameCollectionRef, {
        ...values,
        createDate: serverTimestamp(),
        creatorId: anonymously.uid,
      }).then((game) => {
        navigate(generatePath(gamePath.item, {gameId: game.id}));
      });
    },
    [anonymously.uid, gameCollectionRef, navigate]
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
