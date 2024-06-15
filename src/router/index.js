import React, { Fragment } from "react";
import MainRoutes from "./main";
import dynamic from "next/dynamic";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

// dynamic split component using next js
const Dashboard = dynamic(() => import("../pages/dashboard"), { ssr: true });
const Profile = dynamic(() => import("../pages/profile"), { ssr: false });

const set = {
  exact: true,
  sensitive: true,
  strict: true,
};

export const routeList = [
  {
    ...set,

    path: "/",
    layout: "sidebar",
    children: <Redirect to="/profile" />,
    private: true,
    menu: true,
    footer: true,
  },
  {
    ...set,

    path: "/explore",
    layout: "sidebar",
    children: <Dashboard />,
    private: true,
    menu: true,
    footer: true,
  },
  {
    ...set,

    path: "/profile",
    layout: "sidebar",
    children: <Profile />,
    private: true,
  },
];

const Routes = () => (
  <Fragment>
    <MainRoutes options={routeList} />
  </Fragment>
);

export default Routes;
