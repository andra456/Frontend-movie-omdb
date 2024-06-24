import React, { Fragment } from "react";
import _, { each } from "lodash";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/movieAction";

import { ReactComponent as Play } from "../../../static/assets/img/ico/play.svg";
import { ReactComponent as Like } from "../../../static/assets/img/ico/like.svg";

import { ReactComponent as Down } from "../../../static/assets/img/ico/down-arrow.svg";
import { ReactComponent as Plus } from "../../../static/assets/img/ico/plus.svg";
import { ReactComponent as Dislike } from "../../../static/assets/img/ico/dislike.svg";
import { ReactComponent as Close } from "../../../static/assets/img/ico/cancel.svg";
import { ReactComponent as Arrow } from "../../../static/assets/img/ico/back.svg";
import "./_index.scss";

function Carousel(props) {
  const {
    grid,
    title,
    data,
    children,
    IDkey,
    detail,
    content,
    GetSimilar,
    onPlay,
  } = props;

  const defGrid = {
    marginRight: 0,
    width: 0,
  };
  const defExpanse = {
    active: false,
    index: "",
    data: {},
    classId: "",
    position: {},
  };
  const initdefPage = {
    type: "run",
    style: {},
    page: 0,
  };
  const isMount = React.useRef(false);
  const [loading, setloading] = React.useState(false);
  const [tempGrid, setTempGrid] = React.useState(grid);
  const [movieDetail, setMovieDetail] = React.useState(null);
  const [expanse, setexpanse] = React.useState(defExpanse);
  const [pages, setpage] = React.useState(initdefPage);
  const [isShow, setIsShow] = React.useState(false);

  const [styleGrid, setstyleGrid] = React.useState(defGrid);

  const classGrid = () => {
    let documentWidth = document.querySelector(
      IDkey ? `.${IDkey}` : "#current-carousel"
    ).clientWidth;
    let rect = documentWidth - 20;
    let w = grid ? Number(grid) : 1;
    if (documentWidth < 1200 && w === 6) {
      w = 4;
    } //992
    if (documentWidth < 768 && w === 4) {
      w = 3;
    }
    if (documentWidth < 468 && w === 3) {
      w = 2;
    }

    setTempGrid(w);

    let m = 10;
    let p = m * (w - 1);
    let g = (Math.round(rect) - p) / w;

    let box = g;

    let st = {
      marginRight: m,
      width: box,
    };
    setstyleGrid(st);
  };

  const handleButtons = (type) => {
    let documentWidth = document.querySelector(
      IDkey ? `.${IDkey}` : "#current-carousel"
    ).clientWidth;
    let fullwidht = document.querySelector(
      IDkey ? `.${IDkey} .overflow` : "#current-carousel .overflow"
    ).clientWidth;
    let index = type === "next" ? pages.page + 1 : pages.page - 1;
    let a = data.length / tempGrid;
    let d = a.toString().split(".");

    let sheet = (documentWidth * index - 10 * index) * -1;
    let endDiff = (fullwidht - documentWidth + 10) * -1;

    let c = d.length > 1 ? Number(d[0]) : Number(d[0]) - 1;

    console.log(index, type, c);
    if (index < c && index >= 0) {
      setpage({ page: index, type: "run", style: { marginLeft: sheet } });
    } else if (index === c) {
      setpage({ page: index, type: "end", style: { marginLeft: endDiff } });
    } else if (index > c) {
      setpage(initdefPage);
    }
  };

  const handleModal = (e, i, show) => {
    let a = getPosition(`${IDkey}_${e.id}`);
    let def = {
      index: i,
      active: true,
      data: e,
      classId: show ? "loadbox" : "expanse fadeOut",
      position: a,
    };

    setexpanse(def);
    setIsShow(false);
    setTimeout(() => {
      setexpanse({
        ...def,
        classId: show ? "loadbox expanse" : "loadbox hiddenshow",
      });
    }, 500);

    setTimeout(() => {
      let add = show === false ? { active: false } : {};
      setexpanse({ ...def, classId: show ? "expanse" : "", ...add });
    }, 1000);
    if (show) {
      setTimeout(() => {
        detail({ id: e.id, append_to_response: "videos,images" });
        GetSimilar({ id: e.id });
        setTimeout(() => {
          setIsShow(true);
        }, 9000);
      }, 200);
    }
  };
  React.useEffect(() => {
    let a = data.length / tempGrid;
  }, [styleGrid]);

  React.useLayoutEffect(() => {
    isMount.current = true;
    function updateSize() {
      //setSize([window.innerWidth, window.innerHeight]);
      classGrid();
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  React.useLayoutEffect(() => {
    if (isMount.current) {
      if (content) {
        setMovieDetail(content);
      }
    }
  }, [content]);

  const ModalOverviews = () => {
    let load = true;
    let e = content.detail_movie ? content.detail_movie : null;
    if (e) {
      setTimeout(() => {
        load = false;
      }, 1000);
    }
    return (
      <>
        <div className="description row">
          <div className="col-md-8">
            <div className="dets">
              <ul>
                {e ? (
                  <>
                    <li> {e.status} </li>
                    <li> {e.original_language}</li>
                    <li className="rated"> {e.vote_average} </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
              <p className="desc">{e ? e.overview : ""}</p>
            </div>
          </div>
          <div className="col-md-4 review-cast">
            {e ? (
              <>
                <p className="genres">
                  Genre :{" "}
                  {e.genres.map((x, i) => (
                    <span key={i}>
                      {" "}
                      {x.name}
                      {e.genres.length === i + 1 ? "" : ","}{" "}
                    </span>
                  ))}
                </p>
                <p className="ph">
                  Production :{" "}
                  {e.production_companies.map((x, i) => (
                    <span key={i}>
                      {" "}
                      {x.name}
                      {e.production_companies.length === i + 1 ? "" : ","}{" "}
                    </span>
                  ))}
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="list-episode">
          {content.similar_movie.length > 0 ? (
            <>
              <h3>Similar Movies</h3>
              <div className="caro-grid row">
                {content.similar_movie.map((x, i) => (
                  <div key={i} className="item col-xs-6 col-md-4 col-lg-4">
                    <div className="box">
                      <div className="movie">
                        <div
                          className="movie-img"
                          onClick={() => onPlay(x.id)}
                          style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w400${x.backdrop_path})`,
                          }}></div>
                      </div>
                      <div className="disc-similar">
                        <h3>
                          <div className="sort-list">
                            <span className="year">
                              {x.release_date.split("-")[0]}
                            </span>
                            <span className="lang">{x.original_language}</span>
                            <span className="voted">
                              {Math.floor(x.vote_average)}
                            </span>
                          </div>
                          {x.title}
                        </h3>
                        <p> {x.overview} </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </>
    );
  };
  const Loader = () => {
    return <div></div>;
  };
  const Images = ({ data, index, isPlay }) => {
    //  expanse.active && expanse.index === i && expanse.classId ==='loadbox expanse'
    let defURL = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
    let hightRes = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

    const staticVideo =
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    const Video = () => (
      <video autoPlay={true} muted loop id="myVideo">
        <source src={staticVideo} type="video/mp4" />
      </video>
    );

    let defImage = defURL;
    let show = true;

    if (
      expanse.active &&
      expanse.index === index &&
      expanse.classId === "loadbox"
    ) {
      defImage = hightRes;
    } else if (
      expanse.active &&
      expanse.index === index &&
      expanse.classId === "expanse"
    ) {
      defImage = hightRes;
      show = false;
    }
    return (
      <div className="movie" style={{ backgroundImage: `url(${defImage})` }}>
        {expanse.index === index && expanse.classId === "expanse" ? (
          <button
            onClick={() => handleModal(data, index, false)}
            className="close">
            <Close fill="#fff" />{" "}
          </button>
        ) : (
          ""
        )}
        <div
          className="movie-img"
          style={
            show
              ? { backgroundImage: `url(${defURL})` }
              : { backgroundColor: "transparent" }
          }
        />
        {isPlay && (
          <div className="video-trailer">
            <Video />
          </div>
        )}
      </div>
    );
  };
  const getPosition = (id) => {
    let offsets = document
      .getElementById("movie_" + id)
      .getBoundingClientRect();
    let top = offsets.top - 25;
    let left = offsets.left - 50;
    let width = styleGrid.width + 100;

    return { top, left, width };
  };
  function trans(id) {
    const genre = _.find(content.genres_movie, { id: id });
    return genre ? genre.name : "";
  }

  return (
    <div
      className={`container content-wrapper ${IDkey && IDkey}`}
      id={"current-carousel"}>
      {title ? <h3 className="header">{title}</h3> : ""}
      <div className="carousel own-mouse">
        <button
          className="btn prev"
          onClick={() => handleButtons("prev")}
          disabled={pages.page === 0}>
          <Arrow />
        </button>
        <button
          className="btn next"
          onClick={() => handleButtons("next")}
          disabled={pages.type === "end"}>
          <Arrow />
        </button>

        <div
          className={`overflow pages-${
            pages.type === "end" ? "end" : pages.page
          }`}
          style={pages.style}>
          {data.map((e, i) => (
            <div
              key={i}
              className={`item`}
              id={`movie_${IDkey}_${e.id}`}
              style={styleGrid}>
              {children || (
                <Fragment>
                  <div className="movie">
                    <div
                      className="movie-img"
                      onClick={() => onPlay(e.id)}
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500${e.backdrop_path})`,
                      }}></div>
                  </div>

                  <div
                    className={`overlay-grid ${
                      expanse.active && expanse.index === i
                        ? expanse.classId
                        : ""
                    }`}>
                    <div
                      className="box-body"
                      style={
                        expanse.active && expanse.index === i
                          ? expanse.position
                          : {}
                      }>
                      <div className="parrent-scrol-bar">
                        <div className="child-scrol-bar">
                          <Images
                            data={e}
                            index={i}
                            isPlay={
                              expanse.active && expanse.index === i && isShow
                            }
                          />

                          <div className="detail-movie">
                            <div className="beriers">
                              <ul>
                                <li>
                                  <span
                                    onClick={() => onPlay(e.id)}
                                    className="play">
                                    <Play fill="#fff" />
                                  </span>
                                  <span>
                                    <Plus fill="#fff" />
                                  </span>
                                  <span>
                                    <Like fill="#fff" />
                                  </span>
                                  <span>
                                    <Dislike fill="#fff" />
                                  </span>
                                </li>
                                {expanse.classId === "" ? (
                                  <li>
                                    <span
                                      onClick={() => handleModal(e, i, true)}>
                                      <Down fill="#fff" />
                                    </span>
                                  </li>
                                ) : (
                                  ""
                                )}
                              </ul>

                              <h3>{e.original_title}</h3>
                              {expanse.classId === "" ? (
                                <>
                                  <div className="sort-list">
                                    <span className="year">
                                      {e.release_date
                                        ? e.release_date.split("-")[0]
                                        : ""}
                                    </span>

                                    <span className="voted">
                                      {e.vote_average ? e.vote_average : ""}
                                    </span>
                                    <span className="lang">
                                      {e.original_language
                                        ? e.original_language
                                        : ""}
                                    </span>
                                    <span className="lang">HD</span>
                                  </div>
                                  <ul className="genre">
                                    {e.genre_ids?.slice(0, 4).map((e) => (
                                      <>
                                        {trans(e) !== "" && <li>{trans(e)}</li>}
                                      </>
                                    ))}
                                  </ul>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          {expanse.active && expanse.index === i ? (
                            <ModalOverviews e={e} />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          ))}
        </div>

        <div className="loader-movie">{loading ? <Loader /> : ""}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  content: state.content,
});
const mapDispatchToProps = (dispatch) => ({
  detail: (data) => dispatch(action.singleContent(data)),
  GetSimilar: (data) => dispatch(action.similarContent(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
