import {TExample} from 'modules/example/types';
import React from 'react';
import './ExampleItem.less';

type Props = {
  example: TExample;
};

export const ExampleItem = (props: Props) => {
  const {example} = props;

  return <pre className="ExampleItem">{JSON.stringify(example, undefined, 2)}</pre>;
};
