import { getFullLink } from 'src/modules/common/lib/getFullLink';

export const gamePath = {
  item: '/:gameId',
} as const;

export const GAME_ROOT = '/' as const;

const getGameLink = getFullLink('' as const);

export const gameLinks = {
  item: getGameLink(gamePath.item),
};
