import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../modules/home/pages/Home';
import Catalog from "../modules/catalog/pages/Catalog";

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
			</Routes>
		</>
	);
};
