import React, {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import './ExampleHead.less';

type Props = {
  linkText: ReactNode;
  linkUrl: string;
  title: ReactNode;
};

export const ExampleHead = (props: Props) => {
  const {linkText, linkUrl, title} = props;

  return (
    <>
      <h1 className="ExampleHead__Title">{title}</h1>
      <p>
        <Link to={linkUrl}>{linkText}</Link>
      </p>
    </>
  );
};
