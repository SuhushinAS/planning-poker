export type TGame = {
  creatorId: string;
  createDate: number;
  memberIds: Record<string, boolean>;
  options: number[];
  title: string;
};
