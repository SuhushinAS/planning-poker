import {appPath} from 'app/constants';
import {setDoc} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Form} from 'modules/form/components/Form';
import {AuthForm} from 'modules/user/components/AuthForm';
import {useUser} from 'modules/user/model/useUser';
import {TAuthFormValues} from 'modules/user/types';
import React, {useCallback, useMemo} from 'react';
import {DeepPartial, SubmitHandler} from 'react-hook-form';
import {Navigate} from 'react-router';

export const Auth = () => {
  const user = useUser();
  const defaultValues = useMemo<DeepPartial<TAuthFormValues>>(() => ({name: ''}), []);
  const anonymously = useAnonymouslyContext();
  const userDocRef = useDocRef('user', anonymously.uid);

  const onSubmit = useCallback<SubmitHandler<TAuthFormValues>>((values) => setDoc(userDocRef, values), [userDocRef]);

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
