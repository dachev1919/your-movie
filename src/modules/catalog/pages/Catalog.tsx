import React, {FC, useEffect, useRef, useState} from 'react';
import { MediaType } from '../../../@types/types';
import { IFilm } from '../../../@types/interfaces';
import Section from '../../../common/components/section/Section';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../../home/components/card/Card';
import { getDiscover } from '../../../common/api/tmbd-api';
import { tmdbImageFormating } from '../../../utils/tmdb-image';
// import Loading from '../../../common/components/loading/Loading';

interface ICatalogProps {
	type: MediaType | 'search';
}

const Catalog: FC<ICatalogProps> = props => {
	const navigate = useNavigate();
	let title: string = '';
	let request: (page: number) => Promise<{
		totalPages: number,
		films: IFilm[]
	}>;

	const [films, setFilms] = useState<IFilm[]>([]);
	const [params] = useSearchParams();
	const pageRef = useRef(1);
	const totalPageRef = useRef(2);
	const loadingRef = useRef(false);
	const [onLoading, setOnLoading] = useState(false);

	switch (props.type) {
		case 'movie':
			title = 'Movies';
			request = (page: number) => getDiscover('movie', page);
			break;
		case 'tv':
			title = 'TV';
			request = (page: number) => getDiscover('tv', page);
			break;
		case 'search':
			title = `Search results for ${params.get('q')}`;
			break;
		default:
			break;
	}

	const fetch = async () => {
		setOnLoading(true);
		loadingRef.current = true;

		const {films, totalPages} = await request(pageRef.current);

		setOnLoading(false);
		loadingRef.current = false;

		totalPageRef.current = totalPages;
		setFilms(prevState => [...prevState, ...films]);
	};

	useEffect(() => {
		setFilms([]);
		fetch();
		window.scrollTo({ top: 0 });
	}, [props.type]);

	const onWindowScroll = () => {
		if (loadingRef.current) return;

		if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
			if (totalPageRef.current > pageRef.current) {
				pageRef.current++;
				fetch();
			}
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', onWindowScroll);

		return () => {
			window.removeEventListener('scroll', onWindowScroll);
		}
	})
	//
	// if (films === undefined) {
	// 	return (
	// 		<div className='fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center'>
	// 			<Loading />
	// 		</div>
	// 	);
	// }

	return (
		<>
			{/*backdrop*/}
			<div className='h-[8rem] relative'>
				<div className='overlay-film-cover' />
				<div className='h-full w-full bg-primary'></div>
			</div>
			{/*poster and text*/}
			<Section
				title={title}
				className='-mt-[6rem] flex items-center relative z-10'
			></Section>
			{/*films*/}
			<Section>
				<div className='grid lg:grid-cols-4 sm:grid-cols-4 mobile:grid-cols-2 ultra-xl:grid-cols-1 relative z-[11]'>
					{films.map(film => (
						<Card
							onClick={() => navigate(`/your-movie/${film.mediaType}/${film.id}`)}
							imageSrc={tmdbImageFormating(film.posterPath)}
							title={film.title}
							key={`catalog-${film.id}`}
						/>
					))}
				</div>
			</Section>
		</>
	);
};

export default Catalog;
