import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../reduxs/store';
import { fetchSearch } from '../../../reduxs/actions';
import _ from 'lodash'

import { Logo, Logo2, Menu } from "../../../assets/img/Images";
import { IoSearchOutline } from 'react-icons/io5'
type Props = {
  active: boolean,
  onShowPushMenu: (text: boolean) => void;
}

const Nav: React.FC<Props> = ({ onShowPushMenu, active }) => {


  const isMount = useRef(false);
  const [searchValue, setsearchValue] = useState('')
  const [inpSearch, setInputSearch] = useState('')
  const [dataList, setData] = React.useState<any | null>([]);
  const data = useSelector((state: RootState) => state.content.movies.search)
  const dispatch = useDispatch()

  const delayedSearch = React.useCallback(_.debounce(value => {
    setInputSearch(value)
  }, 1000), []);

  const handleSearch = (e: any) => {
    let value = e.target.value
    if (e.key === 'Enter') { setInputSearch(value) }
    else { delayedSearch(value) }
    setsearchValue(value)
  }

  useEffect(() => {
    isMount.current = true;
    if (isMount.current) {
    }
    return function cleanup() {

    }
  }, [])

  useEffect(() => {
    if (isMount.current) {
      dispatch(fetchSearch({ s: inpSearch }))
    }
    console.log(inpSearch)
  }, [inpSearch])

  useEffect(() => {
    if (isMount.current) {
      if (data) { console.log(data); setData(data) }
      else { setData([]) }
    }
  }, [data])



  return (
    <Fragment>

      <div className={`top-head-menu`}>
        <div className="wrap-container flex-menu">
          <div className="side-one">
            <div className="logo"><a href="/"><Logo className="wide" />  <Logo2 className="mobile" /></a></div>
          </div>
          <div className="side-two spare-menu">
            <div className="ui action fluid input">
              <IoSearchOutline /><input value={searchValue} type="text" onChange={(e) => handleSearch(e)} onKeyPress={(e) => handleSearch(e)} placeholder="Search..." />

              {dataList.length > 0 && (<div className="result">
                <ul>
                  {dataList.map((e: any, i: number) => (<li key={i} >
                    <a href={`/watch/${e.imdbID}`}> 
                    <img src={e.Poster} alt={e.Title} />
                    <div className="meta">
                      <h3>{e.Title}</h3> <span>{e.Year} </span> </div></a> </li>))}
                </ul>
              </div>)}
            </div>


            <button className="menu-mobile" onClick={() => onShowPushMenu(!active)}>
              <Menu />
            </button>
          </div>

        </div>
      </div>
    </Fragment>


  )
}

export default Nav;
