import React, { FC } from 'react';
import {ICustomComponentProps} from "../../../../@types/interfaces";
import {mergeClassName} from "../../../../utils/merge-class-name";

const Container: FC<ICustomComponentProps> = (props) => {

  return (
    <div className={mergeClassName('p-3 max-w-screen-2xl mx-auto', props.className)}>
      {props.children}
    </div>
  );
};

export default Container;
