import { useAnonymouslyContext } from 'src/modules/firebase/ui/Anonymously';
import { useUser } from 'src/modules/user/lib/useUser';

export const useUserSelf = () => {
  const anonymously = useAnonymouslyContext();

  return useUser(anonymously.uid);
};
