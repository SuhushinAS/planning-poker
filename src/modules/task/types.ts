export type TTask = {
  gameId: string;
  isVoted: boolean;
  title: string;
  votes: Record<string, number>;
};
