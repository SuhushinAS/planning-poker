import { useMemo } from 'react';
import { optionTitleMap } from 'src/modules/option/lib/constants';
import { isOption, Option, TOption } from 'src/modules/option/lib/types';
import { voteHidden } from 'src/modules/vote/lib/constants';

export type GetVoteValue = (voteValueList: number[]) => string | number;

export const useVoteValue = (
  voteValueList: number[],
  isVoted: boolean,
  getVoteValue: GetVoteValue,
) => {
  return useMemo(() => {
    if (0 === voteValueList.length) {
      return optionTitleMap[Option.reset];
    }

    if (!isVoted) {
      return voteHidden;
    }

    const voteSpecialList = voteValueList.filter((voteValue) => isOption(voteValue));
    const voteSpecial = Math.min(0, ...voteSpecialList) as TOption;

    if (voteSpecial) {
      return optionTitleMap[voteSpecial];
    }

    return getVoteValue(voteValueList);
  }, [getVoteValue, isVoted, voteValueList]);
};
