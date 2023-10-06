import {setDoc} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useRenderContext} from 'modules/firebase/components/Render';
import {useDocRef} from 'modules/firebase/lib/useDocRef';
import {Form} from 'modules/form/components/Form';
import {AuthForm} from 'modules/user/components/AuthForm';
import {TUser} from 'modules/user/types';
import React, {useCallback, useMemo} from 'react';
import {DeepPartial, SubmitHandler} from 'react-hook-form';

export const Auth = () => {
  const render = useRenderContext();
  const anonymously = useAnonymouslyContext();
  const userDocRef = useDocRef('user', anonymously.uid);
  const defaultValues = useMemo<DeepPartial<TUser>>(() => ({name: ''}), []);

  const onSubmit = useCallback<SubmitHandler<TUser>>(
    (values) => setDoc(userDocRef, values).then(() => render(false)),
    [render, userDocRef]
  );

  return (
    <Form defaultValues={defaultValues} onSubmit={onSubmit}>
      <AuthForm />
    </Form>
  );
};
