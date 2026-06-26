import { setDoc } from 'firebase/firestore';
import { useCallback, useMemo } from 'react';
import { DefaultValues, SubmitHandler } from 'react-hook-form';
import { useDocRef } from 'src/modules/firebase/lib/useDocRef';
import { useAnonymouslyContext } from 'src/modules/firebase/ui/Anonymously';
import { Form } from 'src/modules/form/ui/Form';
import { TUser } from 'src/modules/user/lib/types';
import { AuthForm } from 'src/modules/user/ui/AuthForm';

export const Auth = () => {
  const anonymously = useAnonymouslyContext();
  const userDocRef = useDocRef('user', anonymously.uid);
  const defaultValues = useMemo<DefaultValues<TUser>>(() => ({ name: '' }), []);

  const onSubmit = useCallback<SubmitHandler<TUser>>(
    (values) => setDoc(userDocRef, values),
    [userDocRef],
  );

  return (
    <Form defaultValues={defaultValues} onSubmit={onSubmit}>
      <AuthForm />
    </Form>
  );
};
