import React, { Fragment } from 'react'
import MainRoutes from './main';
import { MdFavoriteBorder } from 'react-icons/md'
import {  BiUser, BiImages, BiDoorOpen } from 'react-icons/bi';

const Home = React.lazy(() => import('../pages/home'));
const Watch = React.lazy(() => import('../pages/watch'));
const Intro = React.lazy(() => import('../pages/intro'));


const set = {
  exact: true,
  sensitive: true,
  strict: true,
};


export const routeList = [
  {
    ...set,
    key: "dashboard",
    text: 'Movies',
    icon : <BiDoorOpen/>,
    menu: true,
    path: "/explore",
    layout: "sidebar",
    children: <Home />,
    private: true

  },
  {
    ...set,
    key: "intro",
    text: 'intro',
    menu: false,
    path: "/",
    layout: "blank",
    children: <Intro />,
    private: false
  },
  {
    ...set,
    key: "movies_detail",
    text: 'watch',
    icon : null,
    menu: false,
    path: "/watch/:Id",
    layout: "sidebar",
    children: <Watch />,
    private: true

  }

]


const Routes = () => (
  <Fragment>
    <MainRoutes options={routeList} />

  </Fragment>
);

export default Routes;
