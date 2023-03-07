import React, { FC, useEffect, useState } from 'react';
import Section from '../../../common/components/section/Section';
import { IFilm } from '../../../@types/interfaces';
import TrendingHero from '../components/trending-hero/TrendingHero';
import Slider from '../../../common/components/slider/Slider';
import Card from '../components/card/Card';
import { useNavigate } from 'react-router-dom';
import {
	getInTheaters,
	getPopulars,
	getTopRated,
	getTrailers,
	getTrendings
} from '../../../api/tmbd-api';
import { tmdbImageFormating } from '../../../utils/tmdb-image';
import { mergeFilms } from '../../../utils/merge-films';
import TrailerModals from '../../../common/components/trailer-modals/TrailerModals';

const Home: FC = () => {
	const navigate = useNavigate();
	const [trendings, setTrendings] = useState<IFilm[]>();
	const [inTheaters, setInTheaters] = useState<IFilm[]>();
	const [populars, setPopulars] = useState<IFilm[]>();
	const [topRatedTv, setTopRatedTv] = useState<IFilm[]>();
	const [topRatedMovie, setTopRatedMovie] = useState<IFilm[]>();
	const [trailerModalsSrc, setTrailerModalsSrc] = useState<string>('');

	const playTrailer = async (film: IFilm) => {
		const trailers = await getTrailers(film.mediaType, film.id);

		setTrailerModalsSrc(
			`https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`
		);
	};

	const goToDetailPage = (film: IFilm) => {
		navigate(`/your-movie/${film.mediaType}/${film.id}`);
	};

	const fetchTopRatedTv = async () => {
		setTopRatedTv(await (await getTopRated('tv')).films);
	};

	const fetchTopRatedMovie = async () => {
		setTopRatedMovie(await (await getTopRated('movie')).films);
	};

	const fetchPopulars = async () => {
		const movies = await getPopulars('movie');
		const tvs = await getPopulars('tv');

		setPopulars(mergeFilms(movies, tvs, 20));
	};

	const fetchInTheater = async () => {
		setInTheaters(await getInTheaters());
	};

	const fetchTrending = async () => {
		const movies = await getTrendings('movie');
		const tvs = await getTrendings('tv');

		setTrendings(mergeFilms(movies, tvs));
	};

	useEffect(() => {
		fetchTrending();
		fetchInTheater();
		fetchPopulars();
		fetchTopRatedTv();
		fetchTopRatedMovie();
	}, []);

	return (
		<>
			{/* trendings */}
			<Section className='py-0'>
				<Slider
					className='home-hero'
					autoplay={true}
					slidesToShow={1}
					slidesToScroll={1}
				>
					{onSwipe =>
						trendings?.map(film => (
							<TrendingHero
								onPlayTrailer={() => playTrailer(film)}
								onClick={() =>
									!onSwipe
										? navigate(`/your-movie/${film.mediaType}/${film.id}`)
										: ''
								}
								film={film}
								key={film.id}
							/>
						))
					}
				</Slider>
			</Section>
			{/* in theaters */}
			<Section title='In Theaters'>
				<Slider isMovieCard={true}>
					{() =>
						inTheaters?.map(film => (
							<Card
								title={film.title}
								imageSrc={tmdbImageFormating(film.posterPath)}
								key={film.id}
								onClick={() => goToDetailPage(film)}
							/>
						))
					}
				</Slider>
			</Section>
			{/* populars */}
			<Section title={"Wat's Popular"}>
				<Slider isMovieCard={true}>
					{() =>
						populars?.map(film => (
							<Card
								title={film.title}
								imageSrc={tmdbImageFormating(film.posterPath)}
								key={film.id}
								onClick={() => goToDetailPage(film)}
							/>
						))
					}
				</Slider>
			</Section>
			{/* top-rated tv */}
			<Section
				title={'Top Rated TV'}
				onTitleClick={() => navigate(`/your-movie/list/top-rated-tvs`)}
			>
				<Slider isMovieCard={true}>
					{() =>
						topRatedTv?.map(film => (
							<Card
								title={film.title}
								imageSrc={tmdbImageFormating(film.posterPath)}
								key={film.id}
								onClick={() => goToDetailPage(film)}
							/>
						))
					}
				</Slider>
			</Section>
			{/* top-rated movies */}
			<Section
				title={'Top Rated Movies'}
				onTitleClick={() => navigate(`/your-movie/list/top-rated-movies`)}
			>
				<Slider isMovieCard={true}>
					{() =>
						topRatedMovie?.map(film => (
							<Card
								title={film.title}
								imageSrc={tmdbImageFormating(film.posterPath)}
								key={film.id}
								onClick={() => goToDetailPage(film)}
							/>
						))
					}
				</Slider>
			</Section>
			<TrailerModals onHide={() => setTrailerModalsSrc('')} src={trailerModalsSrc} />
		</>
	);
};

export default Home;
