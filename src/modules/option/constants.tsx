import {SvgIcon} from 'modules/common/components/SvgIcon';
import {TOptionSet} from 'modules/option/types';
import React, {ReactNode} from 'react';

export enum OptionType {
  coffee = -3,
  reset = -1,
  unsure = -2,
}

export const optionTitleMap: Record<OptionType, ReactNode> = {
  [OptionType.coffee]: <SvgIcon name="coffee" />,
  [OptionType.reset]: '\u00A0\u00A0\u00A0',
  [OptionType.unsure]: <SvgIcon name="question" />,
};

export const optionSetFibonacci: TOptionSet = {
  id: 'fibonacci',
  optionList: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
  title: 'Fibonacci',
  titleKey: 'fibonacci',
};

export const optionSetNatural: TOptionSet = {
  id: 'natural',
  optionList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  title: 'Natural',
  titleKey: 'natural',
};

export const optionSetPowerOf2: TOptionSet = {
  id: 'power-of-2',
  optionList: [0, 1, 2, 4, 8, 16, 32, 64, 128],
  title: 'Powers of 2',
  titleKey: 'power-of-2',
};

export const optionSetListDefault: TOptionSet[] = [optionSetNatural, optionSetFibonacci, optionSetPowerOf2];
