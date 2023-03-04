import { FC } from 'react';
import Image from "../../../../common/components/image/Image";
import {ICustomComponentProps, IFilm} from "../../../../@types/interfaces";

interface ICardProps extends ICustomComponentProps{
  film: IFilm;
}

const Card: FC<ICardProps> = (props) => {

  return (
    <div className='mx-3 my-1.5 '>
      <Image className='!h-[200px]' src='' alt=''/>
      <p className='py-1.5 line-clamp-2'>{props.film.title}</p>
    </div>
  );
};

export default Card;
