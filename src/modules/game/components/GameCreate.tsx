import {addDoc, serverTimestamp} from 'firebase/firestore';
import {useAnonymouslyContext} from 'modules/firebase/components/Anonymously';
import {useCollectionRef} from 'modules/firebase/lib/useCollectionRef';
import {Form} from 'modules/form/components/Form';
import {GameCreateForm} from 'modules/game/components/GameCreateForm';
import {gamePath} from 'modules/game/constants';
import {TGame} from 'modules/game/types';
import {optionSetDefault} from 'modules/option/constants';
import {useOptionSetList} from 'modules/option/model/useOptionSet';
import {TOptionSet} from 'modules/option/types';
import React, {useCallback, useMemo} from 'react';
import {DefaultValues} from 'react-hook-form';
import {generatePath, useNavigate} from 'react-router';

type Props = {
  optionSetList: TOptionSet[];
};

type TGameForm = TGame & {optionSetId: string};

export const GameCreateWithOptions = (props: Props) => {
  const {optionSetList} = props;
  const navigate = useNavigate();
  const anonymously = useAnonymouslyContext();
  const gameCollectionRef = useCollectionRef('game');
  const defaultValues = useMemo(() => {
    const result: DefaultValues<TGameForm> = {
      title: '',
    };
    const optionSetFirst = optionSetList[0] ?? optionSetDefault;

    result.optionSetId = optionSetFirst.id;

    return result;
  }, [optionSetList]);
  const optionSetMap = useMemo(() => {
    return Object.fromEntries(
      optionSetList.map((optionSet) => {
        return [optionSet.id, optionSet];
      })
    );
  }, [optionSetList]);

  const onSubmit = useCallback(
    ({optionSetId, ...values}) => {
      const optionSet = optionSetMap[optionSetId] ?? optionSetDefault;
      const {optionList} = optionSet;

      if (optionList !== undefined) {
        const data = {
          ...values,
          createDate: serverTimestamp(),
          creatorId: anonymously.uid,
          optionList,
        };
        return addDoc(gameCollectionRef, data).then((game) => {
          navigate(generatePath(gamePath.item, {gameId: game.id}));
        });
      }

      return Promise.resolve();
    },
    [anonymously.uid, gameCollectionRef, navigate, optionSetMap]
  );

  return (
    <Form<TGameForm> defaultValues={defaultValues} onSubmit={onSubmit}>
      <GameCreateForm optionSetList={optionSetList} />
    </Form>
  );
};

export const GameCreate = () => {
  const optionSetList = useOptionSetList();

  if (optionSetList === undefined) {
    return null;
  }

  return <GameCreateWithOptions optionSetList={optionSetList} />;
};
