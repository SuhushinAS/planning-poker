import React, {Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState} from 'react';

type Props = {
  children: ReactNode;
};

const RenderContext = createContext<Dispatch<SetStateAction<boolean>> | undefined>(undefined);

export const RenderProvider = ({children}: Props) => {
  const [render, setRender] = useState(true);

  useEffect(() => {
    if (!render) {
      setRender(true);
    }
  }, [render]);

  if (!render) {
    return null;
  }

  return <RenderContext.Provider value={setRender}>{children}</RenderContext.Provider>;
};

export const useRenderContext = () => {
  const render = useContext(RenderContext);

  if (render === undefined) {
    throw new Error('useRenderContext can only be used in a RenderProvider');
  }

  return render;
};
