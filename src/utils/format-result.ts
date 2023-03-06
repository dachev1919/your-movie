import { IFilm, ISeason } from '../@types/interfaces';
import { MediaType } from '../@types/types';

export const formatResult = (obj: any, mediaType?: MediaType): IFilm => {
	return {
		id: obj.id,
		title: obj.title || obj.name,
		description: obj.overview,
		coverPath: obj.backdrop_path,
		posterPath: obj.poster_path,
		genreIds: obj.genre_ids || obj.genres?.map((g: any) => g.id) || [],
		mediaType: mediaType || obj.media_type,
		seasons:
			obj.seasons?.map(
				(season: any) =>
					({
						id: season.id,
						filmName: obj.title,
						name: season.name,
						posterPath: season.poster_path,
						seasonNumber: season.season_number,
						episodes: [],
						airDate: season.air_date
					} satisfies ISeason)
			) || []
	};
};
