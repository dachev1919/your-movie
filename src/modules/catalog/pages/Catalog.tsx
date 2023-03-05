import React, {FC, useEffect, useState} from 'react';
import {MediaType} from "../../../@types/types";
import {IFilm} from "../../../@types/interfaces";
import Image from "../../../common/components/image/Image";
import Section from "../../../common/components/section/Section";
import {useSearchParams} from "react-router-dom";
import Card from "../../home/components/card/Card";

interface ICatalogProps {
  type: MediaType | 'search';
}

const Catalog: FC<ICatalogProps> = (props) => {
  let title: string = '';
  const [films, setFilms] = useState<IFilm[]>([]);
  const [params] = useSearchParams();

  switch (props.type) {
    case "movie":
      title = 'Movies'
      break;
    case 'tv':
      title = 'TV';
      break;
    case "search":
      title = `Search results for ${params.get('q')}`;
      break;
    default:
      break;
  }

  const fetch = () => {
    const arrs: any[] = [];

    for (let i = 0; i < 6; i++) {
      arrs.push({
        id: i,
        title: ''
      });
    }

    setFilms(arrs);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {/*backdrop*/}
      <div className='h-[8rem] relative'>
        <div className='overlay-film-cover' />
        <Image src='' alt='' />
      </div>
      {/*poster and text*/}
      <Section title={title} className='-mt-[6rem] flex items-center relative z-10'>

      </Section>
      {/*films*/}
      <Section>
        <div className='grid lg:grid-cols-4 sm:grid-cols-4 mobile:grid-cols-2 ultra-xl:grid-cols-1 relative z-[11]'>
          {films.map(film => (
            <Card imageSrc='' title={film.title} key={`catalog-${film.id}`}/>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Catalog;
