import {Form} from 'modules/form/components/Form';
import {GameJoinForm} from 'modules/game/components/GameJoinForm';
import {gamePath} from 'modules/game/constants';
import React, {useCallback, useMemo} from 'react';
import {DefaultValues} from 'react-hook-form';
import {SubmitHandler} from 'react-hook-form/dist/types/form';
import {generatePath, useNavigate} from 'react-router';

type GameJoinValues = {gameId: string};

export const GameJoin = () => {
  const navigate = useNavigate();
  const defaultValues = useMemo<DefaultValues<GameJoinValues>>(() => {
    return {
      gameId: '',
    };
  }, []);

  const onSubmit = useCallback<SubmitHandler<GameJoinValues>>(
    (values) => {
      navigate(generatePath(gamePath.item, values));
    },
    [navigate]
  );

  return (
    <Form defaultValues={defaultValues} onSubmit={onSubmit}>
      <GameJoinForm />
    </Form>
  );
};
