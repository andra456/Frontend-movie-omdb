import React, { Fragment, useState, useEffect, useRef } from "react";
import history from "./history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import dynamic from "next/dynamic";

const Wrapper = dynamic(() => import("../../material/layout"));

function MainRouter(props) {
  const [isLoad, setIsLoad] = useState(true);
  const isMount = useRef();

  useEffect(() => {
    isMount.current = true;
    setIsLoad(false);
  }, []);

  const PrivateRoute = ({ children, ...rest }) => {
    // Jika mengaktifkan auth buat kondisi di sini : rest.private dan token
    return <Route {...rest} render={() => children} />;
  };

  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          {!isLoad &&
            props.options.map((e, i) => (
              <PrivateRoute key={"a" + i} {...e}>
                <Wrapper {...e} />
              </PrivateRoute>
            ))}
        </Switch>
      </Router>
    </Fragment>
  );
}

export default MainRouter;
