import {appPath} from 'app/constants';
import {setDoc} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Form} from 'modules/form/components/Form';
import {AuthForm} from 'modules/user/components/AuthForm';
import {useUserSelf} from 'modules/user/model/useUserSelf';
import {TUser} from 'modules/user/types';
import React, {useCallback, useMemo} from 'react';
import {DeepPartial, SubmitHandler} from 'react-hook-form';
import {Navigate} from 'react-router';

export const Auth = () => {
  const user = useUserSelf();
  const defaultValues = useMemo<DeepPartial<TUser>>(() => ({name: ''}), []);
  const anonymously = useAnonymouslyContext();
  const userDocRef = useDocRef('user', anonymously.uid);

  const onSubmit = useCallback<SubmitHandler<TUser>>((values) => setDoc(userDocRef, values), [userDocRef]);

  if (user === undefined) {
    return null;
  }

  if (user.exists()) {
    return <Navigate to={appPath.home} />;
  }

  return (
    <Form defaultValues={defaultValues} onSubmit={onSubmit}>
      <AuthForm />
    </Form>
  );
};
