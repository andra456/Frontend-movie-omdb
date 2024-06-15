import React, {  Fragment, useState, useEffect, useRef } from 'react'
import '../../static/style/globals.scss'
import Head from './header';
import dynamic from 'next/dynamic';
//import Cookies from "js-cookie";
// Cookies.set('part', 'dashboard', { expires: 1 });
const Nav = dynamic(() => import('./navigation'),{ ssr: true })
const Footer = dynamic(() => import('./footer'),{ ssr: false })

function Wrapper(props)  {
  const {menu, footer = false} = props
  const options = props
  const nav = options.layout === 'sidebar'?true:false
  const isMount = useRef(false);
  const [active, setactive] = useState(false);
  const [preload, setpreload] = useState(true);
  const [classLoader, setclassLoader] = useState('')

  useEffect(() => {
    isMount.current =true
    console.log(nav)
  }, [])

  useEffect(() => {
    if (isMount.current) {
      setTimeout(() => {
        setpreload(false)
        
        smallStop()
      }, 6000);
      setTimeout(() => {
        smallIn()
        setTimeout(() => {
          smallOut()
         
        }, 3000);
      }, 500);
    }
  }, [props.children])

  const activated =(e)=> {
      setactive(e)
  }

  function smallIn () {
    let netflix = document.querySelector('.netflix')
    if (netflix) netflix.classList.add('small-in')
  }

  function smallOut () {
    let netflix = document.querySelector('.netflix')
    if (netflix) netflix.classList.remove('small-in')
    if (netflix) netflix.classList.add('small-out')
  }

  function smallStop () {
    let netflix = document.querySelector('.netflix')
    if (netflix) netflix.classList.remove('small-out')
  }

  const LoaderComponent = ()=>(
    <div class={`netflix`}>
    <span></span>
    <span></span>
    <span></span>
    </div>
  )
  return (
    <Fragment>
      <Head
        title={options.title}
        description={options.description}
      />
 
      <div className={`preloader ${preload?'active':''}`} > 
      <div className="logo-center">
        <div class="center">
           <LoaderComponent/>
        </div>
      </div> </div>
      <div className={`constractor ${active? 'active-push' : '' }`}>
      { nav ? <Nav active={active} menu={props.menu} onShowPushMenu={ (e)=>{  activated(e) } } /> : ''}

        <div className="body-content">
          { props.children }
        </div>
        { footer ? <Footer/> :'' }
      </div>
      
    </Fragment>
);}



export default Wrapper;