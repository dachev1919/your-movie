import React, { FC } from 'react';
import {ICustomComponentProps} from "../../../../@types/interfaces";
import {mergeClassName} from "../../../../utils/merge-class-name";

const Container: FC<ICustomComponentProps> = (props) => {

  return (
    <div className={mergeClassName('px-6 py-3 max-w-screen-2xl mx-auto mobile:px-3', props.className)}>
      {props.children}
    </div>
  );
};

export default Container;
