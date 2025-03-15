import {addDoc, serverTimestamp} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useCollectionRef} from 'modules/firebase/lib/useCollectionRef';
import {Form} from 'modules/form/components/Form';
import {GameCreateForm} from 'modules/game/components/GameCreateForm';
import {gamePath} from 'modules/game/constants';
import {TGame} from 'modules/game/types';
import React, {useCallback} from 'react';
import {DefaultValues, SubmitHandler} from 'react-hook-form';
import {generatePath, useNavigate} from 'react-router';

const DEFAULT_VALUES: DefaultValues<TGame> = {
  title: '',
};

export const GameCreate = () => {
  const navigate = useNavigate();
  const anonymously = useAnonymouslyContext();
  const gameCollectionRef = useCollectionRef('game');

  const onSubmit = useCallback<SubmitHandler<TGame>>(
    (values) => {
      const data = {
        ...values,
        createDate: serverTimestamp(),
        creatorId: anonymously.uid,
      };
      return addDoc(gameCollectionRef, data).then((game) => {
        navigate(generatePath(gamePath.item, {gameId: game.id}));
      });
    },
    [anonymously.uid, gameCollectionRef, navigate]
  );

  return (
    <Form<TGame> defaultValues={DEFAULT_VALUES} onSubmit={onSubmit}>
      <GameCreateForm />
    </Form>
  );
};
