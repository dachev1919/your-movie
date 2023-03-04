import { FC } from 'react';
import {IFilm} from "../../../../@types/interfaces";
import Image from "../../../../common/components/image/Image";
import {MdPlayCircleOutline} from 'react-icons/md';

interface ITrendingHeroProps {
  film: IFilm
}

const TrendingHero: FC<ITrendingHeroProps> = (props) => {
  return (
    <div className='h-[300px] relative flex items-center'>
      {/*bg image*/}
      <div className='absolute w-full h-full left-0 top-0 bottom-0'>
        <div className='overlay-slick-hero'></div>
        <Image src='' alt=''/>
      </div>
      {/*text*/}
      <div className='flex flex-col gap-3 items-start relative z-10 mx-[55px] max-w-[50%] mobile:max-w-full'>
        <p className='text-xl line-clamp-1'>{props.film.title}</p>
        <p className='text-sm line-clamp-3'>{props.film.description}</p>
        <button className='px-3 py-1.5 flex items-center gap-3 bg-primary rounded-md'>
          <MdPlayCircleOutline size={18}/>
          <span>Play trailers</span>
        </button>
      </div>
    </div>
  );
};

export default TrendingHero;
