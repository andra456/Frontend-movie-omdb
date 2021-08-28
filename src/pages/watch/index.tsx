import React, { Fragment} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reduxs/store';
import { fetchById } from '../../reduxs/actions';

import {
   
    BrowserRouter as 
    Link,
    useRouteMatch,
  } from 'react-router-dom';
import './_index.scss'
export interface MatchParams {
  Id: string;
}

const Watch = (props : any) =>{
    
    const routepath = useRouteMatch<MatchParams>('/watch/:Id');
    const content = useSelector((state: RootState) => state.content.movies.detail)
    const [data, setData] = React.useState<any | null>({});
    const dispatch = useDispatch()
    const Id = routepath?.params.Id;
    const isMount = React.useRef(false);

    React.useEffect(() => {
        isMount.current = true
        if (isMount.current) { 
          dispatch(fetchById({i: Id}) )
        }
          
    }, [])
    React.useEffect(() => {
      if (isMount.current) { 
        setData(content)
      }
    }, [content])
    
    return (
    <Fragment>      
          
          <section className="vision-section">
          <div className="container">
          <div className="head-static patter-dash">

          </div>
          <div className="movie-show">
              <div className="detail">
                {data?
                <div className="meta-writter row">
                    <div className="col-xs-12 col-md-4">
                        <img src={data.Poster} className="poster" />
                    </div>
                    <div className="col-xs-12 col-md-8">
                        <h1>{data.Title}</h1>
                        <span>{ data.Rated}</span> <span> { data.Genre}</span>
                        <p>{ data.Plot}</p>
                        <p>Actors : { data.Actors}</p>
                        <p>Awards : { data.Awards}</p>
                        <p>Country : { data.Country}</p>
                        <p>Director : { data.Director}</p>
                        <p>Language : { data.Language}</p>
                        <p>Writer:{ data.Writer} </p>
                        <p>Year: { data.Year}</p>
            
                    </div>
                </div> :'' }

              </div>
  
  
           
          </div>
      </div>
          </section>
    
    </Fragment>
  );
}

export default Watch