import React, {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import './ExampleHead.less';

type Props = {
  linkText: ReactNode;
  linkUrl: string;
  title: ReactNode;
};

export const ExampleHead = ({linkText, linkUrl, title}: Props) => {
  return (
    <>
      <h1 className="ExampleHead__Title">{title}</h1>
      <p>
        <Link to={linkUrl}>{linkText}</Link>
      </p>
    </>
  );
};
