import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/movieAction";
import _ from "lodash";
import "./_index.scss";
import { ReactComponent as Loader } from "../../static/assets/img/ico/loading.svg";
import Carousel from "../../material/components/card";
import Onemotion from "../../material/components/oneMotion";
import PlayerMovies from "../../material/components/player";

function Dashboard(props) {
  const { content, load, upcomming, toprated, nowplaying, genre } = props;
  const initModal = {
    show: false,
    data: {},
  };
  const defaultReq = {
    language: "en-US",
    sort_by: "popularity.desc",
    include_adult: true,
    include_video: true,
    with_watch_monetization_types: "flatrate",
    page: 1,
  };

  const [dataList, setData] = React.useState([]);
  const [reqMovie, setReqMovie] = React.useState(defaultReq);
  const [loading, setloading] = React.useState(false);
  const [modal, setmodal] = React.useState(initModal);
  const isMount = React.useRef(false);

  const configCarousel = [
    {
      IDkey: "discover",
      grid: 6,
      title: "Discover Movies",
      data: dataList,
    },
    {
      IDkey: "upcomming",
      grid: 6,
      title: "Up Comming Movie",
      data: content.upcomming ? content.upcomming.results : [],
    },
    {
      IDkey: "toprated",
      grid: 6,
      title: "Top Rated Movie",
      data: content.toprated ? content.toprated.results : [],
    },
    {
      IDkey: "nowplaying",
      grid: 6,
      title: "Now playing Movie",
      data: content.nowplaying ? content.nowplaying.results : [],
    },
  ];

  React.useEffect(() => {
    isMount.current = true;
    if (isMount.current) {
      //setReqMovie({...reqMovie })
    }
  }, []);

  React.useEffect(() => {
    if (isMount.current) {
      load(reqMovie);
      upcomming(reqMovie);
      toprated(reqMovie);
      nowplaying(reqMovie);
      genre({});
    }
  }, [reqMovie]);

  React.useEffect(() => {
    setTimeout(() => {
      if (isMount.current) {
      }
    }, 2000);
  }, [loading]);

  React.useEffect(() => {
    if (isMount.current) {
      if (!_.isNil(content.list_movie)) {
        let movie = content.list_movie.results;
        setData([...dataList, ...movie]);
        setloading(false);
      }
    }
  }, [content.list_movie]);
  const handlePlay = () => {
    setmodal({ ...modal, show: true });
  };

  return (
    <Fragment>
      <PlayerMovies
        onHandle={(e) => setmodal({ ...modal, show: e })}
        {...modal}
      />
      <div>
        <Onemotion />
        {configCarousel.map((e, i) => (
          <Carousel key={i} {...e} onPlay={handlePlay} />
        ))}
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  content: state.content,
});
const mapDispatchToProps = (dispatch) => ({
  load: (data) => dispatch(action.loadContent(data)),
  upcomming: (data) => dispatch(action.commingMovies(data)),
  toprated: (data) => dispatch(action.topRatedMovies(data)),
  nowplaying: (data) => dispatch(action.getNowMovies(data)),
  detail: (data) => dispatch(action.singleContent(data)),
  genre: (data) => dispatch(action.getGenre(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
