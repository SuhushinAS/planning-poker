import {useAppDispatch} from 'app/hooks';
import {actionGameGetList} from 'modules/game/actions';
import React, {useEffect} from 'react';

export const Game = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionGameGetList);
  }, [dispatch]);

  return <div>Game</div>;
};
