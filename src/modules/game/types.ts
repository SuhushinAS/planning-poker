import {Timestamp} from 'firebase/firestore';

export type TGame = {
  creatorId: string;
  createDate: Timestamp;
  memberIds: Record<string, boolean>;
  optionList: number[];
  taskId?: string;
  title: string;
};
