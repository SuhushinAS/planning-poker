import {optionTitleMap, OptionType} from 'modules/option/constants';
import {voteHidden} from 'modules/vote/constants';
import {useMemo} from 'react';

export type GetVoteValue = (voteValueList: number[]) => string | number;

export const useVoteValue = (voteValueList: number[], isVoted: boolean, getVoteValue: GetVoteValue) => {
  return useMemo<string | number>(() => {
    if (0 === voteValueList.length) {
      return optionTitleMap[OptionType.reset];
    }

    if (!isVoted) {
      return voteHidden;
    }

    const voteSpecialList = voteValueList.filter((voteValue) => OptionType[voteValue]);
    const voteSpecial = Math.min(0, ...voteSpecialList);

    if (voteSpecial) {
      return optionTitleMap[voteSpecial];
    }

    return getVoteValue(voteValueList);
  }, [getVoteValue, isVoted, voteValueList]);
};
