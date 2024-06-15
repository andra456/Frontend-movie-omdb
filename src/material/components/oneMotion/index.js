import React, { Fragment, useState, useEffect } from "react";

import { ReactComponent as Play } from "../../../static/assets/img/ico/play.svg";
import { ReactComponent as Like } from "../../../static/assets/img/ico/like.svg";
import { ReactComponent as Plus } from "../../../static/assets/img/ico/plus.svg";
import { ReactComponent as Dislike } from "../../../static/assets/img/ico/dislike.svg";
import { ReactComponent as TopFive } from "../../../static/assets/img/logo/top-5.svg";
import { Movies } from "./movieList";
import "./_index.scss";

function OneMotion(props) {
  const [showInfo, setShowInfo] = useState(true);
  const [index, setIndex] = useState(0);
  const { show, data, callback } = props;
  const Detail = Movies.categories[0].videos;

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Example usage:

  const selected = Detail[index];

  useEffect(() => {
    setTimeout(() => {
      setShowInfo(false);
    }, 20 * 1000);
    // index
    setIndex(getRandomNumber(0, Detail.length - 1));
  }, []);

  return (
    <Fragment>
      <div className={`oneMotion-overlay `}>
        <div className="item modal-movie-card">
          <div className="movie">
            <div className="video">
              <video autoPlay={true} muted loop id="myVideo">
                <source src={selected?.sources[0]} type="video/mp4" />
              </video>
              <div
                className="movie-img"
                onClick={() => console.log("test")}
                style={{ backgroundImage: `` }}></div>
            </div>
          </div>
          <div className="main-motion container row">
            <div className="detail-movie col-md-6">
              <h1>
                <img src="/assets/images/UGvbGzfIVcoSn49HnZ6IA.png" />
              </h1>
              <div class={`supplemental-message ${showInfo ? "" : "hide"}`}>
                <div>
                  <TopFive className="svg-icon" />
                  #5 in Movies Today
                </div>
                <p>{selected.description}</p>
              </div>

              <div className="beriers">
                <ul>
                  <li>
                    <span className="play">
                      <Play fill="#fff" />
                    </span>
                    <span className="detail"> More info</span>
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default OneMotion;
