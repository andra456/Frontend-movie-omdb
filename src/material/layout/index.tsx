import React, { Fragment, useState, useEffect, useRef } from 'react'
import '../../assets/style/globals.scss'
import './_layout.scss'
import { Logo } from "../../assets/img/Images";

const Nav = React.lazy(() => import('./navigation'))
const Footer = React.lazy(() => import('./footer'))
const SidePanels = React.lazy(() => import('./navigation/sidePanel'))

function Wrapper(props: any) {
  const options = props
  const nav = options.layout === 'sidebar' ? true : false
  const isMount = useRef(false);
  const [active, setactive] = useState(false);
  const [preload, setpreload] = useState(true);

  useEffect(() => {
    isMount.current = true
  }, [])

  useEffect(() => {
    if (isMount.current) {
      setTimeout(() => {
        setpreload(false)
      }, 800);
    }
  }, [props.children])

  const activated = (e: boolean) => {
    setactive(e)
  }
  return (
    <Fragment>
      <div className={`preloader ${preload ? 'active' : ''}`} > <div className="logo-center"><Logo /></div> </div>
      {props.layout !== 'blank' ? (
        <div className={`constractor ${active ? 'active-push' : ''}`}>
          {nav ? <Nav active={active} onShowPushMenu={(e) => { activated(e) }} /> : ''}

          <div className="wrap-container float-content">

            <div className="panel-menu side-one">
              <div className="leading-panel">
                Reviews Movies IMDB
              </div>
              <SidePanels />
            </div>
            <div className="side-one">
            </div>
            <div className="side-two scroll">
              <div className="body-content">
                {props.children}
              </div>
            </div>
          </div>
          <Footer />
        </div>) : (<div>{props.children}</div>)
      }

    </Fragment>
  );
}



export default Wrapper;