import {appPath} from 'app/constants';
import {doc, setDoc} from 'firebase/firestore';
import {useFirebaseAnonymContext} from 'modules/firebase/components/FirebaseAuthAnonymously';
import {useFirebaseFirestoreContext} from 'modules/firebase/components/FirebaseFirestore';
import {Form} from 'modules/form/components/Form';
import {AuthForm} from 'modules/user/components/AuthForm';
import {useIsUser} from 'modules/user/model/useIsUser';
import {TAuthFormValues} from 'modules/user/types';
import React, {useCallback, useMemo} from 'react';
import {DeepPartial, SubmitHandler} from 'react-hook-form';
import {Navigate} from 'react-router';

export const Auth = () => {
  const isUser = useIsUser();
  const defaultValues = useMemo<DeepPartial<TAuthFormValues>>(() => ({name: ''}), []);
  const firebaseAnonym = useFirebaseAnonymContext();
  const firebaseFirestore = useFirebaseFirestoreContext();
  const onSubmit = useCallback<SubmitHandler<TAuthFormValues>>(
    (values) => {
      setDoc(doc(firebaseFirestore, 'user', firebaseAnonym.uid), values);
    },
    [firebaseAnonym.uid, firebaseFirestore]
  );

  if (isUser === undefined) {
    return null;
  }

  if (true === isUser) {
    return <Navigate to={appPath.home} />;
  }

  return (
    <Form defaultValues={defaultValues} onSubmit={onSubmit}>
      <AuthForm />
    </Form>
  );
};
