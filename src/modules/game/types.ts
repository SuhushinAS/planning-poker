export type TGame = {
  creatorId: string;
  createDate: number;
  memberIds: Record<string, boolean>;
  optionList: number[];
  taskId: string;
  taskIds: Record<string, boolean>;
  title: string;
};
