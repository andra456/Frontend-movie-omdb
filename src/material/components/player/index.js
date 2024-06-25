import React from "react";
import CustomPlayer from "./controller";

// Lazy load the YouTube player

import "./_index.scss";

function PlayerMovies(props) {
  const { show = false, data, onHandle } = props;
  return show ? (
    <div className="wideo">
      <CustomPlayer onClose={() => onHandle(false)} />
    </div>
  ) : null;
}
export default PlayerMovies;
