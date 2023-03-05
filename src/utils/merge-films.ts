import {IFilm} from "../@types/interfaces";
import {isFilm} from "./is-film";

export const mergeFilms = (movies: IFilm[], tvs: IFilm[], limit = 6) => {
  const array: IFilm[] = [];

  for (let i = 0; i < limit; i++) {
    let film: unknown;
    if (i % 2 === 1) {
      if (tvs[i - 1]) {
        film = tvs[i - 1];
      }
    } else {
      if (movies[i - 1]) {
        film = movies[i - 1];
      }
    }

    if (isFilm(film)) {
      array.push(film);
    }
  }

  return array;
}