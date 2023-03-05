import React, { FC, useEffect, useState } from 'react';
import Image from '../../../common/components/image/Image';
import Section from '../../../common/components/section/Section';
import { IFilm } from '../../../@types/interfaces';

const Season: FC = () => {
	const [film, setFilm] = useState<IFilm>({
		id: 0,
		coverPath: '',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur earum iusto officia reiciendis rem sapiente soluta ut. Dicta error exercitationem inventore maiores nulla odit omnis rem sint sit, tempora.',
		mediaType: 'tv',
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

	const [episodes, setEpisodes] = useState<any[]>();

	const fetch = () => {
		const arrs: any[] = [];

		for (let i = 0; i < 12; i++) {
			arrs.push({});
		}

		setEpisodes(arrs);
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<>
			{/*backdrop*/}
			<div className='h-[9.5rem] relative'>
				<div className='overlay-film-cover' />
				<Image src='' alt='' />
			</div>
			{/*poster and text*/}
			<Section className='-mt-[4.85rem] flex items-center relative z-10 mobile:block'>
				<Image
					className='!w-[10rem] !min-w-[10rem] !h-[12.5rem] mobile:mx-auto'
					src=''
					alt=''
				/>
				<div className='px-3 flex flex-col items-start gap-3 mobile:mt-4'>
					<p className='text-xl line-clamp-1'>{film.title}</p>
					<p className='opacity-80'>Season 1 | {episodes?.length} episodes</p>
				</div>
			</Section>
			{/*episodes*/}
			<Section title='Episodes'>
				{episodes?.map(episode => (
					<div
						key={'episode-' + episode.id}
						className='my-6 flex items-stretch rounded-md p-3 transition gap-4 cursor-pointer hover:bg-primary/30'
					>
						<Image className='min-w-[19rem] w-[19rem] h-[19rem]' src='' alt='' />
						<div className='overflow-hidden flex flex-col gap-3'>
							<p className='text-lg truncate'>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
								assumenda autem consectetur cum deleniti eius fugiat illum
								inventore mollitia nihil odio, optio, porro quas, quasi quia quo
								sapiente totam ullam?
							</p>
							<p className='opacity-80 line-clamp-3'>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Aliquid autem beatae blanditiis cum ex ipsam iusto laudantium
								maxime minima necessitatibus, nulla porro qui repudiandae, ullam
								ut vel velit veniam voluptas.
							</p>
							<div className='mt-auto pt-3 text-right'>22 November 2023</div>
						</div>
					</div>
				))}
			</Section>
		</>
	);
};

export default Season;
