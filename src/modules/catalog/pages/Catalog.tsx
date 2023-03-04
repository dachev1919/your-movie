import React, { FC } from 'react';
import {MediaType} from "../../../@types/types";

interface ICatalogProps {
  type: MediaType | 'search';
}

const Catalog: FC<ICatalogProps> = (props) => {

  return (
    <div>
      <h1>Catalog {props.type}</h1>
    </div>
  );
};

export default Catalog;
