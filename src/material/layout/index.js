import React, { Fragment, useState, useEffect, useRef } from "react";
import "../../static/style/globals.scss";
import Head from "./header";
import dynamic from "next/dynamic";
import { useLocation } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { ReactComponent as Loder } from "../../static/assets/img/ico/loading.svg";
import "./_index.scss";

// Function to check if the current route is "/profile"

const Nav = dynamic(() => import("./navigation"), { ssr: true });
const Footer = dynamic(() => import("./footer"), { ssr: false });

function Wrapper(props) {
  const { menu, footer = false } = props;

  const options = props;
  const nav = options.layout === "sidebar" ? true : false;
  const isMount = useRef(false);
  const [active, setactive] = useState(false);
  const [preload, setpreload] = useState(true);
  const location = useLocation();

  function isProfileRoute() {
    return location.pathname === "/profile";
  }
  const isProfile = isProfileRoute();
  useEffect(() => {
    isMount.current = true;
    console.log(nav);
  }, []);

  useEffect(() => {
    if (isMount.current) {
      setTimeout(() => {
        setpreload(false);

        smallStop();
      }, 6000);
      setTimeout(() => {
        smallIn();
        setTimeout(() => {
          smallOut();
        }, 3000);
      }, 500);
    }
  }, [props.children]);

  const activated = (e) => {
    setactive(e);
  };

  function smallIn() {
    let netflix = document.querySelector(".netflix");
    if (netflix) netflix.classList.add("small-in");
  }

  function smallOut() {
    let netflix = document.querySelector(".netflix");
    if (netflix) netflix.classList.remove("small-in");
    if (netflix) netflix.classList.add("small-out");
  }

  function smallStop() {
    let netflix = document.querySelector(".netflix");
    if (netflix) netflix.classList.remove("small-out");
  }

  const LoaderComponent = () =>
    isProfile ? (
      <div class={`netflix`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    ) : (
      <div id="loader" class="nfLoader">
        <Loder />
      </div>
    );
  return (
    <Fragment>
      <Head title={options.title} description={options.description} />

      <div className={`preloader ${preload ? "active" : ""}`}>
        <div className="logo-center">
          <div class="center">
            <LoaderComponent />
          </div>
        </div>
      </div>
      <div className={`constractor ${active ? "active-push" : ""}`}>
        {nav ? (
          <Nav
            active={active}
            menu={props.menu}
            onShowPushMenu={(e) => {
              activated(e);
            }}
          />
        ) : (
          ""
        )}

        <div className="body-content">{props.children}</div>
        {footer ? <Footer /> : ""}
      </div>
    </Fragment>
  );
}

export default Wrapper;
