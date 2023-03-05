import { ReactNode } from 'react';
import { MediaType } from './types';

export interface ICustomComponentProps {
	children?: ReactNode;
	className?: string;
}

export interface ISeason {
	id: number;
	seasonNumber: number;
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
	link: string;
}

export interface Genre {
	id: number;
	name: string;
}