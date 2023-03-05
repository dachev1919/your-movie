import axios, { AxiosResponse } from 'axios';
import {Genre, ICast, IFilm} from '../../@types/interfaces';
import { MediaType } from '../../@types/types';
import { formatResult } from '../../utils/format-result';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_TMDB_API_URL
});

axiosClient.interceptors.request.use(config => {
	return {
		...config,
		params: {
			...config.params,
			api_key: process.env.REACT_APP_TMDB_API_KEY
		}
	};
});

export const getTrendings = async (mediaType: MediaType): Promise<IFilm[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[];
			}>
		>(`/trending/${mediaType}/week`);

		return data.results.map(val => formatResult(val, mediaType));
	} catch (error: any) {
		console.log(error.message);
	}

	return [];
};

export const getInTheaters = async (): Promise<IFilm[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[];
			}>
		>(`/movie/now_playing`);

		return data.results.map(val => formatResult(val, 'movie'));
	} catch (error: any) {
		console.log(error.message);
	}

	return [];
};

export const getPopulars = async (mediaType: MediaType, page = 1): Promise<IFilm[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[];
			}>
		>(`/${mediaType}/popular`, {
			params: {
				page,
			}
		});

		return data.results.map(val => formatResult(val, mediaType));
	} catch (error: any) {
		console.log(error.message);
	}

	return [];
};

export const getTopRated = async (mediaType: MediaType, page = 1): Promise<IFilm[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				results: unknown[];
			}>
		>(`/${mediaType}/top_rated`, {
			params: {
				page,
			}
		});

		return data.results.map(val => formatResult(val, mediaType));
	} catch (error: any) {
		console.log(error.message);
	}

	return [];
};

export const getSearchItems = async (query: string, page = 1): Promise<{
	totalResults: number,
	films: IFilm[]
}> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				total_results: number;
				results: unknown[];
			}>
		>(`/search/multi`, {
			params: {
				query,
				page,
			}
		});

		return {
			totalResults: data.total_results,
			films: data.results.map(val => formatResult(val))
		};
	} catch (error: any) {
		console.log(error.message);
	}

	return {
		totalResults: 0,
		films: []
	};
};

export const getGenres = async (mediaType: MediaType): Promise<Genre[]> => {
	try {
		const { data } = await axiosClient.get<
			any,
			AxiosResponse<{
				genres: unknown[];
			}>
		>(`/genre/${mediaType}/list`);

		return data.genres as Genre[];
	} catch (error: any) {
		console.log(error.message);
	}

	return [];
};

export const getDetails = async (mediaType: MediaType, id: number): Promise<IFilm | null> => {
	try {
		const { data } = await axiosClient.get(`/${mediaType}/${id}`);

		return formatResult(data, mediaType);
	} catch (error: any) {
		console.log(error.message);
	}

	return null;
};

export const getCasts = async (mediaType: MediaType, id: number): Promise<ICast[]> => {
	try {
		const { data } = await axiosClient.get<any, AxiosResponse<{cast: any[]}>>(`/${mediaType}/${id}/credits`);

		return data.cast.map(c => ({
			id: c.id,
			characterName: c.character,
			name: c.name,
			profilePath: c.profile_path
		})) ?? [];
	} catch (error: any) {
		console.log(error.message);
	}

	return [];
};