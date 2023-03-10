import { FC } from 'react';
import { IFilm } from '../../../../@types/interfaces';
import Image from '../../../../common/components/image/Image';
import { MdPlayCircleOutline } from 'react-icons/md';
import { tmdbImageFormating } from '../../../../utils/tmdb-image';

interface ITrendingHeroProps {
	film: IFilm;
	onClick: () => void;
	onPlayTrailer: () => void;
}

const TrendingHero: FC<ITrendingHeroProps> = props => {
	return (
		<div
			className='h-[26rem] mobile:h-[19rem] relative flex items-center cursor-pointer'
			onClick={() => props.onClick()}
		>
			{/*bg image*/}
			<div className='absolute w-full h-full left-0 top-0 bottom-0'>
				<div className='overlay-slick-hero'></div>
				<Image className='h-full' src={tmdbImageFormating(props.film.coverPath)} alt='' />
			</div>
			{/*text*/}
			<div className='flex flex-col gap-5 items-start relative z-10 mx-[55px] max-w-[50%] mobile:max-w-full'>
				<p className='text-xl font-semibold line-clamp-1'>{props.film.title}</p>
				<p className='text-sm line-clamp-3'>{props.film.description}</p>
				<button
					onClick={e => {
						console.log(1)
						e.stopPropagation();
						props.onPlayTrailer();
					}}
					className='px-3 py-1.5 flex items-center gap-3 bg-primary rounded-md'
				>
					<MdPlayCircleOutline size={18} />
					<span>Play trailers</span>
				</button>
			</div>
		</div>
	);
};

export default TrendingHero;
