import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "../modules/home/pages/Home";


interface RoutersProps {}

export const Routers: FC<RoutersProps> = () => {
  return (
    <>
      <Routes>
        {/*<Route path="/" element={<Navigate to="/" />} />*/}
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};