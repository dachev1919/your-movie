import {IFilm} from "../@types/interfaces";


export const isFilm = (film: any): film is IFilm => {
  return (film as IFilm) !== undefined;
}