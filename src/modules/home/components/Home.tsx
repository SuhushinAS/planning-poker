import {SvgIcon} from 'modules/common/components/SvgIcon';
import {useFirebaseAppContext} from 'modules/firebase/components/FirebaseApp';
import {useFirebaseAuthContext} from 'modules/firebase/components/FirebaseAuth';
import {useFirebaseAnonymContext} from 'modules/firebase/components/FirebaseAuthAnonymously';
import {Message} from 'modules/locale/components/Message';
import React from 'react';

/**
 * Пример компонента.
 * @return {*} Представление.
 */
export const Home = () => {
  const firebaseApp = useFirebaseAppContext();
  const firebaseAuth = useFirebaseAuthContext();
  const firebaseAnonym = useFirebaseAnonymContext();

  console.log({firebaseAnonym, firebaseApp, firebaseAuth});

  return (
    <div className="home">
      <div className="box">
        <h1>
          <Message id="home.title" />
        </h1>
        <h2>
          <SvgIcon name="logo" />
        </h2>
      </div>
    </div>
  );
};
