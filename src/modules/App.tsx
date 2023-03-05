import React, {createContext, FunctionComponent, useContext, useEffect, useState} from 'react';
import Layout from '../common/components/layout/Layout';
import { Routers } from '../routes/Routers';
import {MediaType} from "../@types/types";
import {Genre} from "../@types/interfaces";
import Loading from "../common/components/loading/Loading";
import {getGenres} from "../common/api/tmbd-api";

interface IAppProps {}

type Genres = {
	[key in MediaType]: Genre[];
}

const GlobalContext = createContext<{genres: Genres}>({
	genres: {
		movie: [],
		tv: []
	} satisfies Genres
});

export const useGlobalContext = () => useContext(GlobalContext);

const App: FunctionComponent<IAppProps> = () => {
	const [genres, setGenres] = useState<Genres>({
		movie: [],
		tv: []
	});
	const fetchGenres = async () => {
		const movie = await getGenres('movie');
		const tv = await getGenres('tv');

		setGenres({
			movie,
			tv
		})
	}

	useEffect(() => {
		fetchGenres();
	}, [])

	if (!genres.movie.length || !genres.tv.length) {
		return (
			<div className='fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center'>
				<Loading/>
			</div>
		);
	}

	return (
		<>
			<GlobalContext.Provider value={{genres}}>
				<Layout>
					<Routers />
				</Layout>
			</GlobalContext.Provider>
		</>
	);
};

export default App;
