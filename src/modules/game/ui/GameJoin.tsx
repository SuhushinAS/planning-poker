import { useCallback, useMemo } from 'react';
import { DefaultValues, SubmitHandler } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router';
import { Form } from 'src/modules/form/ui/Form';
import { gamePath } from 'src/modules/game/lib/constants';
import { GameJoinForm } from 'src/modules/game/ui/GameJoinForm';

type GameJoinValues = { gameId: string };

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
    [navigate],
  );

  return (
    <Form defaultValues={defaultValues} onSubmit={onSubmit}>
      <GameJoinForm />
    </Form>
  );
};
