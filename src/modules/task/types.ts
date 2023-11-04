import {Timestamp} from 'firebase/firestore';

export type TTask = {
  createDate?: Timestamp;
  creatorId: string;
  gameId: string;
  isVoted: boolean;
  title: string;
  votes: Record<string, number>;
};
