import {ReactNode} from "react";

export interface ICustomComponentProps {
	children?: ReactNode;
  className?: string;
}

export interface ISeason {
  id: number;
}

export interface IFilm {
  id: number;
  title: string;
  description: string;
  posterPath: string;
  coverPath: string;
  genreIds: number[];
  seasons: ISeason[]
}