import React, { Fragment, useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";

// Lazy load the YouTube player

import "./_index.scss";

function PlayerMovies(props) {
  const [showInfo, setShowInfo] = useState(true);
  const config = {
    width: "100%",
    height: "100%",
    loop: true,
    playing: true,
  };

  return (
    <div className="wideo">
      <div className="back"></div>
      <ReactPlayer
        {...config}
        url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      />
      ;<div className="intro"></div>
      <control className="media">
        <div className="left">
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>

        <div className="right">
          <button></button>
          <button></button>
          <button></button>
        </div>
      </control>
    </div>
  );
}
export default PlayerMovies;
