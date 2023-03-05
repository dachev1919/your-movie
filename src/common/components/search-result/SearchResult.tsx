import React, { FC, useEffect, useState } from 'react';
import { IFilm } from '../../../@types/interfaces';
import Image from '../image/Image';

interface ISearchResultProps {
	keyword: string;
	goToSearchPage: Function;
}

const SearchResult: FC<ISearchResultProps> = props => {
	const [items, setItems] = useState<IFilm[]>([]);

	const fetch = () => {
		const arrs: IFilm[] = [];

		for (let i = 0; i < 8; i++) {
			arrs.push({
				id: i,
				title: 'lorem',
				mediaType: 'tv',
				description: '',
				coverPath: '',
				genreIds: [1, 2, 3, 4, 5, 6],
				posterPath: '',
				seasons: []
			});
		}

		setItems(arrs);
	};

	useEffect(() => {
		fetch();
	}, [props.keyword]);

	return (
		<div className='absolute top-[110%] left-0 right-0 p-3 shadow-lg rounded-md overflow-auto max-h-[30rem] bg-header mobile:w-[296px] mobile:left-[auto]'>
			{items.slice(0, 7).map((film, index) => (
				<div
					key={`search-${film.id}`}
					className='flex items-start p-1.5 rounded-lg hover:bg-primary/30 cursor-pointer m-1.5'
				>
					{/*image*/}
					<Image
						className='!h-[72px] !w-[102px] min-w-[102px] rounded-md'
						src={film.coverPath}
						alt={`search-${index}`}
					/>
					{/*title and genres*/}
					<div className='px-3 truncate'>
						<p className='text-base'>{film.title}</p>
						<ul className='flex flex-wrap gap-x-1.5 text-sm opacity-70'>
							{film.genreIds.map((id, index) => (
								<li key={`genre-${id}`}>item {index}</li>
							))}
						</ul>
					</div>
				</div>
			))}

			{items.length > 5 ? (
				<button
					onClick={() => props.goToSearchPage()}
					className='sticky px-3 -bottom-1.5 py-1.5 transition bg-primary w-full hover:bg-secondary'
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
