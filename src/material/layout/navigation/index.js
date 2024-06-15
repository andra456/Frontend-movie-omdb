import React, { Fragment, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Assets from "../../../static/assets/img/Images";
import * as action from "../../../redux/actions/movieAction";
import { connect } from "react-redux";
import { ReactComponent as Search } from "../../../static/assets/img/ico/search.svg";
import { ReactComponent as Logo } from "../../../static/assets/img/logo/Netflix.svg";
import _ from "lodash";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Nav(props) {
  const { data, autoload, menu = false } = props;
  const initialState = {
    lastPosition: 0,
    ticking: false,
  };
  const [fixed, setfixed] = useState(false);
  const [state, setstate] = useState(initialState);
  const [searchValue, setsearchValue] = useState("");
  const [inpSearch, setInputSearch] = useState("");
  const [dataList, setData] = React.useState([]);

  //Access Redux Store State

  const isMount = useRef(false);
  const delayedSearch = React.useCallback(
    _.debounce((value) => {
      setInputSearch(value);
    }, 1000),
    []
  );

  const handleSearch = (e) => {
    let value = e.target.value;
    if (e.key === "Enter") {
      setInputSearch(value);
    } else {
      delayedSearch(value);
    }
    setsearchValue(value);
  };
  useEffect(() => {
    if (isMount.current) {
      autoload({ query: inpSearch });
    }
  }, [inpSearch]);

  useEffect(() => {
    if (isMount.current) {
      console.log(data.Response);
      if (data.Response == "True") {
        setData(data.Search);
      } else {
        setData([]);
      }
    }
  }, [data]);

  useEffect(() => {
    isMount.current = true;
    if (isMount.current) {
      DetectHeigth();

      window.addEventListener("scroll", function (e) {
        setstate({ ...state, lastPosition: window.scrollY, ticking: true });
      });
    }
    return function cleanup() {
      window.removeEventListener("scroll", function (e) {});
      setstate(initialState);
      setfixed(false);
    };
  }, []);

  const DetectHeigth = () => {
    let html = document.documentElement;
    let x = html.scrollTop;
    if (x !== 0) html.scrollTop = x + 20;
  };

  let globalID;

  useEffect(() => {
    if (state.ticking) {
      if (isMount.current) {
        globalID = requestAnimationFrame(often);
      }
    } else {
      setfixed(false);
    }

    return function cleanup() {
      cancelAnimationFrame(globalID);
    };
  }, [state.lastPosition]);

  function often() {
    if (state.lastPosition > 10) {
      setfixed(true);
    } else {
      setfixed(false);
    }
  }

  // props.onShowPushMenu(!props.active)}
  return (
    <Fragment>
      <div className={`top-head-menu ${fixed ? "fixed_top" : ""}`}>
        <div className="container flex-menu">
          <div className="logo">
            <Logo className="img" />

            {menu ? (
              <nav className="primary-nav">
                <ul>
                  <li>
                    <NavLink to="/" activeClassName="selected">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/tv-show" activeClassName="selected">
                      TV Show
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/movies" activeClassName="selected">
                      Movies
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/tv-show" activeClassName="selected">
                      New &amp; Popular
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/browse/original-audio"
                      activeClassName="selected">
                      Browse by Languages
                    </NavLink>
                  </li>
                </ul>
              </nav>
            ) : (
              ""
            )}
          </div>

          {menu ? (
            <nav className="account">
              <div className="ui action fluid input">
                <button className="ico">
                  <Search />
                </button>
                <input
                  type="text"
                  onChange={(e) => handleSearch(e)}
                  onKeyPress={(e) => handleSearch(e)}
                  placeholder="Search..."
                />
                <div className="result">
                  <ul>
                    {dataList.map((e, i) => (
                      <li key={i}>{e.Title} </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="avatar">
                <div className="toltip-menu">
                  <ul className="list-account">
                    <li>
                      <i className="ico ad"></i> Angela
                    </li>
                    <li>
                      <i className="ico ad"></i> Toms
                    </li>
                    <li>
                      <i className="ico ad"></i> Jack
                    </li>
                    <li>
                      <i className="ico ad"></i> Shopia
                    </li>
                  </ul>
                  <span>
                    <Link to="/profile">Kelola Account</Link>{" "}
                  </span>
                  <ul className="etc">
                    <li>Akun</li>
                    <li>Pusat Bantuan</li>
                    <li>Keluar dari sini</li>
                  </ul>
                </div>
              </div>
            </nav>
          ) : (
            ""
          )}

          {menu ? (
            <button
              className="menu-mobile"
              onClick={() => props.onShowPushMenu(!props.active)}>
              {/* logo mobile */}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  data: state.content.autocomplete,
});
const mapDispatchToProps = (dispatch) => ({
  autoload: (data) => dispatch(action.autocomplete(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
