import React, { FC, useEffect, useState } from 'react';
import { MediaType } from '../../../@types/types';
import Image from '../../../common/components/image/Image';
import Section from '../../../common/components/section/Section';
import { ICast, IFilm, ITrailer } from '../../../@types/interfaces';
import Card from '../../home/components/card/Card';
import Slider from '../../../common/components/slider/Slider';
import { useNavigate, useParams } from 'react-router-dom';
import {getCasts, getDetails} from '../../../common/api/tmbd-api';
import {tmdbImageFormating} from "../../../utils/tmdb-image";
import {useGlobalContext} from "../../App";

interface IFilmProps {
	mediaType: MediaType;
}

const Film: FC<IFilmProps> = props => {
	const globalContext = useGlobalContext();
	const navigate = useNavigate();
	const { id } = useParams();
	const [film, setFilm] = useState<IFilm | null>(null);

	const [casts, setCasts] = useState<ICast[]>([]);
	const [trailers, setTrailers] = useState<ITrailer[]>([]);
	const [recommendations, setRecommendations] = useState<IFilm[]>([]);

	const fetch = async () => {
		const film = await getDetails(props.mediaType, parseInt(id as string));
		//
		if (film) {
			setFilm(film);
			setCasts(await getCasts(film.mediaType, film.id));
		}
		// setTrailers(arrs);
		// setRecommendations(arrs);
	};

	useEffect(() => {
		fetch();
	}, [film]);

	if (!film) {
		return <div>404</div>;
	}

	return (
		<>
			{/*backdrop*/}
			<div className='h-[19rem] left-0 right-0 top-0 relative overflow-hidden'>
				<div className='overlay-film-cover' />
				<Image src={tmdbImageFormating(film.coverPath)} className='w-full h-full' alt='cover' />
			</div>
			{/*poster and text*/}
			<Section className='-mt-[9.5rem] flex items-center relative z-10 mobile:block'>
				<Image
					className='w-[13rem] min-w-[13rem] h-[18.5rem] mobile:mx-auto'
					src={tmdbImageFormating(film.posterPath)}
					alt='poster'
				/>
				<div className='px-3 flex flex-col items-start gap-3 mobile:mt-4'>
					<p className='text-xl line-clamp-1'>{film.title}</p>
					<ul className='flex items-center gap-3 flex-wrap'>
						{film.genreIds.map((id, index) => (
							<li key={`genre-${id}`} className='px-3 py-1.5 bg-primary rounded-lg text-sm'>
								{
									globalContext.genres[film.mediaType]?.find(
										g => g.id === id
									)?.name
								}
								{index !== film.genreIds.length - 1 ? ', ' : ''}
							</li>
						))}
					</ul>
					<p className='line-clamp-3 opacity-80'>{film.description}</p>
				</div>
			</Section>
			{/*cast*/}
			<Section title='Casts'>
				<div className='scrollbar-thin scrollbar-thumb-primary scrollbar-track-header overflow-auto'>
					<div className='flex items-center'>
						{casts.map((cast, index) => (
							<div
								className='flex-shrink-0  !w-[20%] min-w-[12.5rem] my-3'
								key={`casts-2-${index}`}
							>
								<Card
									key={`cast-${index}`}
									title={cast.characterName}
									imageSrc={tmdbImageFormating(cast.profilePath)}
								></Card>
							</div>
						))}
					</div>
				</div>
			</Section>
			{/*trailers*/}
			<Section title='Trailers'>
				<div className='scrollbar-thin scrollbar-thumb-primary scrollbar-track-header overflow-auto'>
					<div className='flex items-center'>
						{casts.map((cast, index) => (
							<div
								className='flex-shrink-0 !w-[25%] min-w-[15rem] my-3'
								key={`casts-2-${index}`}
							>
								<Card
									key={`cast-${index}`}
									title='lorem lorem'
									imageSrc=''
								></Card>
							</div>
						))}
					</div>
				</div>
			</Section>
			{/*seasons*/}
			<Section title='Seasons'>
				<Slider slidesToShow={2} slidesToScroll={2} swipe={false}>
					{() =>
						film.seasons.map((season, index) => (
							<Card
								onClick={() => navigate(`season/${season.seasonNumber}`)}
								title={`season-${season.seasonNumber}`}
								imageSrc=''
								key={'season-' + index}
							/>
						))
					}
				</Slider>
			</Section>
			{/*recommendations*/}
			<Section title='Recommendations'>
				<Slider isMovieCard={true} autoplay={true}>
					{() =>
						recommendations.map(film => (
							<Card
								title={film.title}
								imageSrc=''
								key={'recommendations' + film.id}
							/>
						))
					}
				</Slider>
			</Section>
		</>
	);
};

export default Film;
