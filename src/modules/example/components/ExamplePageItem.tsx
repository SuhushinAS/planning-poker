import {appPath} from 'app/constants';
import {useAppSelector} from 'app/hooks';
import {ExampleHead} from 'modules/example/components/ExampleHead';
import {ExampleItem} from 'modules/example/components/ExampleItem';
import {selectExampleItem} from 'modules/example/selectors';
import {Message} from 'modules/locale/components/Message';
import React from 'react';
import {useParams} from 'react-router-dom';

export const ExamplePageItem = () => {
  const {exampleId = ''} = useParams();
  const example = useAppSelector(selectExampleItem(exampleId));

  return (
    <>
      <ExampleHead linkText={<Message id="example.list.title" />} linkUrl={appPath.example} title={example.name} />
      <ExampleItem example={example} />
    </>
  );
};
