import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useCallback } from 'react';
import { DefaultValues, SubmitHandler } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router';
import { useCollectionRef } from 'src/modules/firebase/lib/useCollectionRef';
import { useAnonymouslyContext } from 'src/modules/firebase/ui/Anonymously';
import { Form } from 'src/modules/form/ui/Form';
import { gamePath } from 'src/modules/game/lib/constants';
import { TGame } from 'src/modules/game/lib/types';
import { GameCreateForm } from 'src/modules/game/ui/GameCreateForm';

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
        navigate(generatePath(gamePath.item, { gameId: game.id }));
      });
    },
    [anonymously.uid, gameCollectionRef, navigate],
  );

  return (
    <Form<TGame> defaultValues={DEFAULT_VALUES} onSubmit={onSubmit}>
      <GameCreateForm />
    </Form>
  );
};
