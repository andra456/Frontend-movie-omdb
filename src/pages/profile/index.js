import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/actions/movieAction";
import _ from "lodash";
import "./_index.scss";
import { ReactComponent as Pic1 } from "../../static/assets/img/logo/profile1.svg";
import { ReactComponent as Pic2 } from "../../static/assets/img/logo/profile2.svg";
import { ReactComponent as Pic3 } from "../../static/assets/img/logo/profile3.svg";
import { ReactComponent as Pic4 } from "../../static/assets/img/logo/profile4.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Profile(props) {
  const onValidateProfile = () => {
    window.location.href = "/explore";
  };
  return (
    <Fragment>
      <div className="page-center">
        <div className="bg-wrapper">
          <h1>Who's Watching?</h1>
          <div className="profile-wrap">
            <div className="profile" onClick={onValidateProfile}>
              <div className="profile-icon profile1">
                <Pic1 />
              </div>
              <div className="profile-name">Amanda</div>
            </div>
            <div className="profile" onClick={onValidateProfile}>
              <div className="profile-icon profile2">
                <Pic2 />
              </div>
              <div className="profile-name">Roger</div>
            </div>
            <div className="profile" onClick={onValidateProfile}>
              <div className="profile-icon profile3">
                <Pic3 />
              </div>
              <div className="profile-name">EcmaShort</div>
            </div>
            <div className="profile" onClick={onValidateProfile}>
              <div className="profile-icon profile4">
                <Pic4 />
              </div>
              <div className="profile-name">Jeson Lint</div>
            </div>
          </div>
          <a href="http://timblin.co/" target="_blank">
            Manage Profiles
          </a>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  content: state.content,
});
const mapDispatchToProps = (dispatch) => ({
  load: (data) => dispatch(action.loadContent(data)),
  detail: (data) => dispatch(action.singleContent(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
