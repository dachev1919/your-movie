import { ReactNode } from 'react';
import { MediaType } from './types';

export interface ICustomComponentProps {
	children?: ReactNode;
	className?: string;
}

export interface IEpisode {
	id: number;
	title: string;
	overview: string;
	airDate: string;
	stillPath: string;
	episodeNumber: number;
}

export interface ISeason {
	id: number;
	name: string;
	filmName: string;
	seasonNumber: number;
	posterPath: string;
	episodes: IEpisode[];
	airDate: string;
}

export interface IFilm {
	id: number;
	mediaType: MediaType;
	title: string;
	description: string;
	posterPath: string;
	coverPath: string;
	genreIds: number[];
	seasons: ISeason[];
}

export interface ICast {
	id: number;
	name: string;
	characterName: string;
	profilePath: string;
}

export interface ITrailer {
	id: number;
	key: string;
}

export interface Genre {
	id: number;
	name: string;
}