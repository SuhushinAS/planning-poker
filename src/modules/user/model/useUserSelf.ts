import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useUser} from 'modules/user/model/useUser';

export const useUserSelf = () => {
  const anonymously = useAnonymouslyContext();

  return useUser(anonymously.uid);
};
