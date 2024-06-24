import React from "react";
import CustomPlayer from "./controller";

// Lazy load the YouTube player

import "./_index.scss";

function PlayerMovies(props) {
  const { show = false, data } = props;
  return show ? (
    <div className="wideo">
      <CustomPlayer />
    </div>
  ) : null;
}
export default PlayerMovies;
