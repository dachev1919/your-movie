import { FC } from 'react';
import {ICustomComponentProps} from "../../../@types/interfaces";
import Container from "../layout/container/Container";

interface ISectionProps extends ICustomComponentProps {
  title?: string;
}

const Section: FC<ISectionProps> = (props) => {

  return (
    <div>
      <Container className={props.className}>
        {props.title ? <h1 className='text-xl px-6 py-1.5'>{props.title}</h1> : ''}
        {props.children}
      </Container>
    </div>
  );
};

export default Section;
