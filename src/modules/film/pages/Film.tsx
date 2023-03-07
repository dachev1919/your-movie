import React, { FC, useCallback, useEffect, useState } from 'react';
import { MediaType } from '../../../@types/types';
import Image from '../../../common/components/image/Image';
import Section from '../../../common/components/section/Section';
import { ICast, IFilm, ITrailer } from '../../../@types/interfaces';
import Card from '../../home/components/card/Card';
import Slider from '../../../common/components/slider/Slider';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
	getCasts,
	getDetails,
	getRecommendations,
	getTrailers
} from '../../../api/tmbd-api';
import { tmdbImageFormating } from '../../../utils/tmdb-image';
import { useGlobalContext } from '../../App';
import { youtubeThumbnail } from '../../../utils/youtube-thumbnail';
import Loading from '../../../common/components/loading/Loading';

interface IFilmProps {
	mediaType: MediaType;
}

const Film: FC<IFilmProps> = props => {
	const location = useLocation();
	const globalContext = useGlobalContext();
	const navigate = useNavigate();
	const { id } = useParams();
	const [film, setFilm] = useState<IFilm | null | undefined>(null);

	const [casts, setCasts] = useState<ICast[]>([]);
	const [trailers, setTrailers] = useState<ITrailer[]>([]);
	const [recommendations, setRecommendations] = useState<IFilm[]>([]);

	const fetch = useCallback(async () => {
		const film = await getDetails(props.mediaType, parseInt(id as string));

		if (film) {
			setFilm(film);
			setCasts(await getCasts(film.mediaType, film.id));
			setTrailers(await getTrailers(film.mediaType, film.id));
			setRecommendations(await getRecommendations(film.mediaType, film.id));
		}
	}, [id, props.mediaType]);

	useEffect(() => {
		setFilm(undefined);
		window.scrollTo({ top: 0 });
		fetch();
	}, [location]);

	if (film === null) {
		// redirect to 404 page
		return <></>;
	} else if (film === undefined) {
		return (
			<div className='fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center'>
				<Loading />
			</div>
		);
	}

	return (
		<>
			{/*backdrop*/}
			<div className='h-[19rem] left-0 right-0 top-0 relative overflow-hidden'>
				<div className='overlay-film-cover' />
				<Image
					src={tmdbImageFormating(film.coverPath)}
					className='w-full h-full'
					alt='cover'
				/>
			</div>
			{/*poster and text*/}
			<Section className='-mt-[9.5rem] flex items-center relative z-10 mobile:block'>
				<Image
					className='w-[13rem] min-w-[13rem] h-[18.5rem] mobile:mx-auto'
					src={tmdbImageFormating(film.posterPath)}
					alt='poster'
				/>
				<div className='px-3 flex flex-col items-start gap-3 mobile:mt-4'>
					<p className='text-4xl line-clamp-1'>{film.title}</p>
					<ul className='flex items-center gap-3 flex-wrap'>
						{film.genreIds.map((id, index) => (
							<li
								key={`genre-${id}`}
								className='px-3 py-1.5 bg-primary rounded-lg text-sm'
							>
								{
									globalContext.genres[film.mediaType]?.find(g => g.id === id)
										?.name
								}
							</li>
						))}
					</ul>
					<p className='line-clamp-3 opacity-80'>{film.description}</p>
				</div>
			</Section>
			{/*cast*/}
			<Section title='Casts'>
				<div className='scrollbar-thin scrollbar-thumb-primary scrollbar-track-header overflow-auto'>
					<div className='flex items-start'>
						{casts.map((cast, index) => (
							<div
								className='flex-shrink-0 w-[20%] min-w-[12.5rem] mb-3'
								key={`casts-2-${index}`}
							>
								<Card
									cursor={false}
									key={`cast-${index}`}
									imageSrc={tmdbImageFormating(cast.profilePath)}
								>
									<p className='font-semibold'>{cast.name}</p>
									<p className='opacity-90 text-sm'>{cast.characterName}</p>
								</Card>
							</div>
						))}
					</div>
				</div>
			</Section>
			{/*trailers*/}
			<Section title='Trailers'>
				<div className='scrollbar-thin scrollbar-thumb-primary scrollbar-track-header overflow-auto'>
					<div className='flex items-center'>
						{trailers.map((trailer, index) => (
							<div
								className='flex-shrink-0 !w-[25%] min-w-[15rem] my-3 ml-3 rounded-md overflow-hidden'
								key={`casts-2-${index}`}
							>
								<Image src={youtubeThumbnail(trailer.key)} alt='trailer' />
							</div>
						))}
					</div>
				</div>
			</Section>
			{/*seasons*/}
			{film.seasons.length > 0 && (
				<Section title='Seasons'>
					<Slider
						slidesToShow={film.seasons.length > 2 ? 3 : 1}
						slidesToScroll={1}
						swipe={false}
					>
						{() =>
							film.seasons.map((season, index) => (
								<Card
									onClick={() => navigate(`season/${season.seasonNumber}`)}
									title={season.name}
									imageSrc={tmdbImageFormating(season.posterPath)}
									key={'season-' + index}
								/>
							))
						}
					</Slider>
				</Section>
			)}
			{/*recommendations*/}
			{recommendations.length && (
				<Section title='Recommendations'>
					<Slider isMovieCard={true}>
						{() =>
							recommendations.map(item => (
								<Card
									onClick={() =>
										navigate(`/your-movie/${props.mediaType}/${item.id}`)
									}
									title={item.title}
									imageSrc={tmdbImageFormating(item.posterPath)}
									key={'recommendations' + item.id}
								/>
							))
						}
					</Slider>
				</Section>
			)}
		</>
	);
};

export default Film;
