import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../modules/home/pages/Home';
import Catalog from "../modules/catalog/pages/Catalog";
import Film from "../modules/film/pages/Film";
import Season from "../modules/season/pages/Season";

interface RoutersProps {}

export const Routers: FC<RoutersProps> = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navigate to='/your-movie' />} />
				{/*<Route path='/*' element={<Navigate to='/' />} />*/}
				<Route path='/your-movie' element={<Home />} />
				<Route path='/your-movie/tv' element={<Catalog type='tv'/>} />
				<Route path='/your-movie/movies' element={<Catalog type='movie'/>} />
				<Route path='/your-movie/search' element={<Catalog type='search'/>} />
				<Route path='/your-movie/tv/:id' element={<Film mediaType='tv'/>} />
				<Route path='/your-movie/movie/:id' element={<Film mediaType='movie'/>} />
				<Route path='/your-movie/tv/:id/season/:seasonNumber' element={<Season />} />
			</Routes>
		</>
	);
};
