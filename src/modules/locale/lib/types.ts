export type TLocaleStore = {
  current: string;
  data: TMessagesData;
  list: string[];
};

export type TMessagesData = {
  [key: string]: TMessages;
};

export type TMessages = {
  [key: string]: string;
};
