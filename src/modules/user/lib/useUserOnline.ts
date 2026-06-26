import { onDisconnect, set } from 'firebase/database';
import { useDbRef } from 'src/modules/firebase/lib/useDbRef';
import { useOnDbValue } from 'src/modules/firebase/lib/useOnDbValue';
import { useAnonymouslyContext } from 'src/modules/firebase/ui/Anonymously';

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
