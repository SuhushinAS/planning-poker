export type TGameStore = {
  data: TGameMap;
  list: string[];
};

export type TGameMap = Record<string, TGame>;

export type TGame = {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  registered: string;
  latitude: number;
  longitude: number;
  tags: string[];
  friends: TGameFriend[];
  greeting: string;
  favoriteFruit: string;
};

export type TGameFriend = {
  id: number;
  name: string;
};
