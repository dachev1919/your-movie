import React, { FC, useEffect, useState } from 'react';
import { MediaType } from '../../../@types/types';
import Image from '../../../common/components/image/Image';
import Section from '../../../common/components/section/Section';
import { ICast, IFilm, ITrailer } from '../../../@types/interfaces';
import Card from '../../home/components/card/Card';
import Slider from '../../../common/components/slider/Slider';
import {useNavigate} from "react-router-dom";

interface IFilmProps {
	mediaType: MediaType;
}

const Film: FC<IFilmProps> = props => {
	const navigate = useNavigate();
	const [film, setFilm] = useState<IFilm>({
		id: 0,
		coverPath: '',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur earum iusto officia reiciendis rem sapiente soluta ut. Dicta error exercitationem inventore maiores nulla odit omnis rem sint sit, tempora.',
		mediaType: props.mediaType,
		genreIds: [1, 2, 3, 4],
		posterPath: '',
		title: 'Lorem Lorem Lorem',
		seasons: [
			{
				id: 1,
				seasonNumber: 1
			},
			{
				id: 2,
				seasonNumber: 2
			},
			{
				id: 3,
				seasonNumber: 3
			}
		]
	});

	const [casts, setCasts] = useState<ICast[]>([]);
	const [trailers, setTrailers] = useState<ITrailer[]>([]);
	const [recommendations, setRecommendations] = useState<IFilm[]>([]);

	const fetchCast = () => {
		const arrs: any[] = [];

		for (let i = 0; i < 6; i++) {
			arrs.push({});
		}

		setCasts(arrs);
		setTrailers(arrs);
		setRecommendations(arrs);
	};

	useEffect(() => {
		fetchCast();
	}, []);

	return (
		<>
			{/*backdrop*/}
			<div className='h-[19rem] relative'>
				<div className='overlay-film-cover' />
				<Image src='' alt='' />
			</div>
			{/*poster and text*/}
			<Section className='-mt-[9.5rem] flex items-center relative z-10 mobile:block'>
				<Image
					className='w-[13rem] min-w-[13rem] h-[18.5rem] mobile:mx-auto'
					src=''
					alt=''
				/>
				<div className='px-3 flex flex-col items-start gap-3 mobile:mt-4'>
					<p className='text-xl line-clamp-1'>{film.title}</p>
					<ul className='flex items-center gap-3 flex-wrap'>
						{film.genreIds.map(genre => (
							<li
								className='px-3 py-1.5 bg-primary rounded-lg text-sm'
								key={'genre-' + genre}
							>
								item {genre}
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
							<div className='flex-shrink-0  !w-[20%] min-w-[12.5rem] my-3'>
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
			{/*trailers*/}
			<Section title='Trailers'>
				<div className='scrollbar-thin scrollbar-thumb-primary scrollbar-track-header overflow-auto'>
					<div className='flex items-center'>
						{casts.map((cast, index) => (
							<div className='flex-shrink-0 !w-[25%] min-w-[15rem] my-3'>
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
					{film.seasons.map((season, index) => (
						<Card
							onClick={() => navigate(`season/${season.seasonNumber}`)}
							title={`season-${season.seasonNumber}`}
							imageSrc=''
							key={'season-' + index}
						/>
					))}
				</Slider>
			</Section>
			{/*recommendations*/}
			<Section title='Recommendations'>
				<Slider isMovieCard={true} autoplay={true}>
					{recommendations.map(film => (
						<Card
							title={film.title}
							imageSrc=''
							key={'recommendations' + film.id}
						/>
					))}
				</Slider>
			</Section>
		</>
	);
};

export default Film;
