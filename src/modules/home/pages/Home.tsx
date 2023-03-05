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
	getTrendings
} from '../../../common/api/tmbd-api';
import { tmdbImageFormating } from '../../../utils/tmdb-image';
import { mergeFilms } from '../../../utils/merge-films';

const Home: FC = () => {
	const navigate = useNavigate();
	const [trendings, setTrendings] = useState<IFilm[]>();
	const [inTheaters, setInTheaters] = useState<IFilm[]>();
	const [populars, setPopulars] = useState<IFilm[]>();
	const [topRatedTv, setTopRatedTv] = useState<IFilm[]>();
	const [topRatedMovie, setTopRatedMovie] = useState<IFilm[]>();

	const goToDetailPage = (film: IFilm) => {
		navigate(`/your-movie/${film.mediaType}/${film.id}`)
	};

	const fetchTopRatedTv = async () => {
		setTopRatedTv(await getTopRated('tv'));
	};

	const fetchTopRatedMovie = async () => {
		setTopRatedMovie(await getTopRated('movie'));
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
					{_ =>
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
					{_ =>
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
			<Section title={'Top Rated TV'}>
				<Slider isMovieCard={true}>
					{_ =>
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
			<Section title={'Top Rated Movies'}>
				<Slider isMovieCard={true}>
					{_ =>
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
		</>
	);
};

export default Home;
