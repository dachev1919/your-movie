import React, {FC, useEffect, useState} from 'react';
import Section from "../../../common/components/section/Section";
import {IFilm} from "../../../@types/interfaces";
import TrendingHero from "../components/trending-hero/TrendingHero";
import Slider from "../../../common/components/slider/Slider";
import Card from "../components/card/Card";

const Home: FC = () => {
	const [trendings, setTrendings] = useState<IFilm[]>();
	const [inTheaters, setInTheaters] = useState<IFilm[]>();

	const fetch = () => {
		const arrs: IFilm[] = [];

		for (let i = 0; i < 6; i++) {
			arrs.push({
				id: i,
				mediaType: 'tv',
				title: 'lorem',
				description: '',
				coverPath: '',
				genreIds: [1, 2, 3, 4, 5, 6],
				posterPath: '',
				seasons: []
			});
		}

		setTrendings(arrs);
		setInTheaters(arrs);
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<>
			{/* trendings */}
			<Section className='py-0'>
				<Slider className='home-hero' autoplay={true} slidesToShow={1} slidesToScroll={1}>
					{
						trendings?.map((film) => (
							<TrendingHero film={film} key={film.id} />
						))
					}
				</Slider>
			</Section>
			{/* in theaters */}
			<Section title='In Theaters'>
				<Slider isMovieCard={true} autoplay={true}>
					{
						inTheaters?.map((film) => (
							<Card title={film.title} imageSrc='' key={film.id} />
						))
					}
				</Slider>
			</Section>
			{/* populars */}
			{/* top-rated tv */}
			{/* to rated movies */}
		</>
	);
};

export default Home;
