import React, { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";

import ReactPlayer from "react-player";
import Duration from "./duration";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiPauseButton } from "react-icons/gi";
import { ReactComponent as TbRewindBackward10 } from "../../../static/assets/img/ico/rewind-back.svg";
import { ReactComponent as TbRewindForward10 } from "../../../static/assets/img/ico/rewind-foward.svg";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMdPlay } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

import { RiFullscreenLine } from "react-icons/ri";
import { TfiCommentAlt } from "react-icons/tfi";
import { TbBoxMultiple, TbBoxModel2Off } from "react-icons/tb";

const init =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const CustomPlayer = () => {
  const [url, setUrl] = useState(init);
  const [pip, setPip] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [controls, setControls] = useState(false);

  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(false);
  const [seeking, setSeeking] = useState(false);

  const player = useRef(null);
  /*
  useEffect(() => {
    // Cleanup function for component unmount
    load(
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    );
    if (player.current) {
      setTimeout(() => {
        // alert("hahahaha");
        document.getElementById("play-component")?.click();
      }, 12000);
    }
    return () => {
      // Clean-up logic if necessary
    };
  }, [player]);
  */

  const load = (url) => {
    setUrl(url);
    setPlayed(0);
    setLoaded(0);
    setPip(false);
  };

  const handlePlayPause = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleToggleMuted = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  const handleSetPlaybackRate = (e) => {
    setPlaybackRate(parseFloat(e.target.value));
  };

  const handleOnPlaybackRateChange = (speed) => {
    setPlaybackRate(parseFloat(speed));
  };

  const handleTogglePIP = () => {
    setPip((prevPip) => !prevPip);
  };

  const handlePlay = () => {
    console.log("onPlay");
    setPlaying(true);
  };

  const handleEnablePIP = () => {
    console.log("onEnablePIP");
    setPip(true);
  };

  const handleDisablePIP = () => {
    console.log("onDisablePIP");
    setPip(false);
  };

  const handlePause = () => {
    console.log("onPause");
    setPlaying(false);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    player.current.seekTo(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    console.log("onProgress", state);
    if (!seeking) {
      setPlayed(state.played);
      setLoaded(state.loaded);
    }
  };

  const handleEnded = () => {
    console.log("onEnded");
    // setPlaying(loop);
  };

  const handleDuration = (duration) => {
    console.log("onDuration", duration);
    setDuration(duration);
  };

  const handleClickFullscreen = () => {
    screenfull.request(document.querySelector(".react-player"));
  };

  const isSpeed = (value) => {
    return value === playbackRate ? "active" : "";
  };
  return (
    <div className="player-control">
      <section className="section">
        <div className="head-player">
          <button className="ico">
            <IoArrowBack />
          </button>
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            ref={player}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onPlay={handlePlay}
            onEnablePIP={handleEnablePIP}
            onDisablePIP={handleDisablePIP}
            onPause={handlePause}
            onPlaybackRateChange={handleOnPlaybackRateChange}
            onEnded={handleEnded}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
        </div>
        <div className="player-controls">
          <div className="controls-container players-netflix">
            <div className="control-row full">
              <div className="control seek">
                <progress className="bg loaded" max={1} value={loaded} />
                <progress className="bg played" max={1} value={played} />
                <input
                  className="seek-range"
                  type="range"
                  min={0}
                  max={0.999999}
                  step="any"
                  value={played}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                />
              </div>
              <Duration className={"epilapse"} seconds={duration * played} />
            </div>
          </div>
          <div className="controls-container ">
            <div className="control-row">
              <button
                className="ico"
                id="play-component"
                onClick={handlePlayPause}>
                {playing ? <GiPauseButton /> : <IoMdPlay />}
              </button>
              <button className="ico">
                <TbRewindBackward10 />
              </button>
              <button className="ico">
                <TbRewindForward10 />
              </button>
              <div className="volume">
                <label className="ico" onClick={handleToggleMuted}>
                  {muted || volume === 0 ? (
                    <BsFillVolumeMuteFill />
                  ) : volume > 0.5 ? (
                    <BsFillVolumeUpFill />
                  ) : (
                    <BsVolumeDownFill />
                  )}
                </label>
                <div className="wrapper">
                  <input
                    orient="vertical"
                    className="input-range"
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
            <div className="control-row title">
              <span>Richie Rich</span>
            </div>
            <div className="control-row">
              <div className="speed">
                <label className="ico">
                  <TbBrandSpeedtest />
                </label>
                <div className="speed popup">
                  <h3>Playback Speed</h3>
                  <div className="list">
                    <button
                      onClick={handleSetPlaybackRate}
                      className={isSpeed(0.5)}
                      value={0.5}>
                      <span>0.5x</span>
                    </button>
                    <button
                      onClick={handleSetPlaybackRate}
                      className={isSpeed(0.75)}
                      value={0.75}>
                      <span>0.75x</span>
                    </button>
                    <button
                      onClick={handleSetPlaybackRate}
                      className={isSpeed(1)}
                      value={1}>
                      <span>1x (Normal)</span>
                    </button>
                    <button
                      onClick={handleSetPlaybackRate}
                      className={isSpeed(1.25)}
                      value={1.25}>
                      <span>1.25x</span>
                    </button>
                    <button
                      onClick={handleSetPlaybackRate}
                      className={isSpeed(1.5)}
                      value={1.5}>
                      <span>1.5x</span>
                    </button>
                  </div>
                </div>
              </div>

              {ReactPlayer.canEnablePIP(url) && (
                <button className="ico" onClick={handleTogglePIP}>
                  {pip ? <TbBoxModel2Off /> : <TbBoxMultiple />}
                </button>
              )}
              <button
                className="ico fullscreen"
                onClick={handleClickFullscreen}>
                <RiFullscreenLine />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomPlayer;
