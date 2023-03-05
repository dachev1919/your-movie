import { FC } from 'react';
import {ICustomComponentProps} from "../../../@types/interfaces";
import Container from "../layout/container/Container";

interface ISectionProps extends ICustomComponentProps {
  title?: string;
}

const Section: FC<ISectionProps> = (props) => {

  return (
    <section className='last:pb-20'>
      <Container className={props.className}>
        {props.title ? <h1 className='text-xl px-3 py-1.5'>{props.title}</h1> : ''}
        {props.children}
      </Container>
    </section>
  );
};

export default Section;
