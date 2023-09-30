import {appPath} from 'app/constants';
import {useIsUser} from 'modules/user/model/useIsUser';
import React from 'react';
import {Navigate} from 'react-router';

export const Game = () => {
  const isUser = useIsUser();

  if (isUser === undefined) {
    return null;
  }

  if (false === isUser) {
    return <Navigate to={appPath.auth} />;
  }

  return <div>Game</div>;
};
