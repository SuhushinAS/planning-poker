import {onDisconnect, set} from 'firebase/database';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useDbRef} from 'modules/firebase/lib/useDbRef';
import {useOnDbValue} from 'modules/firebase/lib/useOnDbValue';

export const useUserOnline = (gameId: string) => {
  const anonymously = useAnonymouslyContext();
  const connectedDbRef = useDbRef('.info/connected');
  const userDbRef = useDbRef(`user/${anonymously.uid}`);

  useOnDbValue(connectedDbRef, (snap) => {
    if (true === snap.val()) {
      onDisconnect(userDbRef)
        .remove()
        .then(() => {
          set(userDbRef, gameId);
        });
    }
  });
};
