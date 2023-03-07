import React, { FC, useEffect, useState } from 'react';
import Image from '../../../common/components/image/Image';
import Section from '../../../common/components/section/Section';
import { ISeason } from '../../../@types/interfaces';
import Loading from '../../../common/components/loading/Loading';
import { getSeasons } from '../../../api/tmbd-api';
import { useParams } from 'react-router-dom';
import { tmdbImageFormating } from '../../../utils/tmdb-image';
import { formatDate } from '../../../utils/format-date';

const Season: FC = () => {
	const [season, setSeason] = useState<ISeason | null>(null);
	const { id, seasonNumber } = useParams<any>();

	const fetch = async () => {
		setSeason(
			await getSeasons(parseInt(id as string), parseInt(seasonNumber as string))
		);
	};

	useEffect(() => {
		fetch();
	}, []);

	if (!season) {
		return (
			<div className='fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center'>
				<Loading />
			</div>
		);
	}

	return (
		<>
			{/*backdrop*/}
			<div className='h-[19rem] left-0 right-0 top-0 relative overflow-hidden'>
				<div className='overlay-film-cover' />
				<Image
					className='rounded-0 rounded-none'
					src={tmdbImageFormating(season.posterPath)}
					alt=''
				/>
			</div>
			{/*poster and text*/}
			<Section className='-mt-[4.85rem] flex items-center relative z-10 mobile:block'>
				<Image
					className='!w-[10rem] !min-w-[10rem] !h-[12.5rem] mobile:mx-auto'
					src={tmdbImageFormating(season.posterPath)}
					alt='poster'
				/>
				<div className='px-3 flex flex-col items-start gap-3 mobile:mt-4'>
					<p className='text-4xl line-clamp-1'>{season.filmName}</p>
					<p className='opacity-80'>
						{season.name} &#8226; {season.episodes?.length} episodes &#8226;{' '}
						{new Date(season.airDate).getFullYear()}
					</p>
				</div>
			</Section>
			{/*episodes*/}
			<Section title='Episodes'>
				{season.episodes?.map(episode => (
					<div
						key={'episode-' + episode.id}
						className='my-6 flex items-stretch rounded-md p-3 transition gap-4 cursor-pointer hover:bg-primary/30'
					>
						<Image
							className='min-w-[19rem] w-[19rem] h-[19rem]'
							src={tmdbImageFormating(episode.stillPath)}
							alt='episode'
						/>
						<div className='overflow-hidden flex flex-col gap-3 w-full'>
							<p className='text-lg truncate'>
								{episode.episodeNumber}. {episode.title}
							</p>
							<p className='opacity-80 line-clamp-3'>{episode.overview}</p>
							<div className='mt-auto pt-3 text-right'>
								{formatDate(episode.airDate)}
							</div>
						</div>
					</div>
				))}
			</Section>
		</>
	);
};

export default Season;
