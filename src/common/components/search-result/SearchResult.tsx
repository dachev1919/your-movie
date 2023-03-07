import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { IFilm } from '../../../@types/interfaces';
import Image from '../image/Image';
import { getSearchItems } from '../../../api/tmbd-api';
import { tmdbImageFormating } from '../../../utils/tmdb-image';
import { useGlobalContext } from '../../../modules/App';
import {useNavigate} from "react-router-dom";

interface ISearchResultProps {
	keyword: string;
	goToSearchPage: Function;
}

const SearchResult: FC<ISearchResultProps> = props => {
	const navigate = useNavigate();
	const [items, setItems] = useState<IFilm[]>([]);
	const searchTimeout = useRef<any>('');

	const globalContext = useGlobalContext();

	const fetch = useCallback(async () => {
		if (!props.keyword) return;

		clearTimeout(searchTimeout.current);
		searchTimeout.current = setTimeout(async () => {
			const result = await getSearchItems(props.keyword);
			setItems(result.films);
		}, 120);
	}, [props.keyword]);

	useEffect(() => {
		fetch();
	}, [props.keyword, fetch]);

	return (
		<div
			className='absolute top-[110%] left-0 right-0 shadow-lg rounded-b-md bg-header overflow-hidden mobile:w-[296px] mobile:left-[auto]'
		>
			<div className='scrollbar-thin scrollbar-thumb-primary scrollbar-track-header max-h-[30rem] overflow-auto'>
				{items.map((film, index) => (
					<div
						key={`search-${film.id}`}
						className='flex items-start p-1.5 rounded-lg hover:bg-primary/30 cursor-pointer m-1.5'
						onClick={() => navigate(`/your-movie/${film.mediaType}/${film.id}`)}
					>
						{/*image*/}
						<Image
							className='!h-[72px] !w-[102px] min-w-[102px] rounded-md'
							src={tmdbImageFormating(film.posterPath)}
							alt={`search-${index}`}
						/>
						{/*title and genres*/}
						<div className='px-3 truncate'>
							<p className='text-base'>{film.title}</p>
							<ul className='flex flex-wrap gap-x-1.5 text-sm opacity-70'>
								{film.genreIds.map((id, index) => (
									<li key={`genre-${id}`}>
										{
											globalContext.genres[film.mediaType].find(
												g => g.id === id
											)?.name
										}
										{index !== film.genreIds.length - 1 ? ', ' : ''}
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>

			{items.length > 5 ? (
				<button
					onClick={() => props.goToSearchPage()}
					className='sticky px-3 bottom-0 py-1.5 transition bg-primary w-full hover:bg-secondary'
				>
					More results
				</button>
			) : (
				''
			)}
		</div>
	);
};

export default SearchResult;
