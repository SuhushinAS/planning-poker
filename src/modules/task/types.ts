export type TTask = {
  isVoted: boolean;
  title: string;
  votes: Record<string, number>;
};
