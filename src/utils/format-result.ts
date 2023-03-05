import { IFilm } from '../@types/interfaces';
import { MediaType } from '../@types/types';

export const formatResult = (
	obj: any,
	mediaType?: MediaType,
): IFilm => {
	return {
		id: obj.id,
		title: obj.title || obj.name,
		description: obj.overview,
		coverPath: obj.backdrop_path,
		posterPath: obj.poster_path,
		genreIds: obj.genre_ids || obj.genres?.map((g:any) => g.id) || [],
		mediaType: mediaType || obj.media_type,
		seasons: obj.seasons || []
	};
};
