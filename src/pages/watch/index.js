import React, { Fragment} from 'react'
import { connect } from 'react-redux';
import * as action from '../../redux/actions/movieAction'
import {
   
    BrowserRouter as 
    Link,
    useRouteMatch,
  } from 'react-router-dom';
import './_index.scss'


const Watch = (props) =>{
    const { data, detail } = props
    const Id = useRouteMatch('/watch/:Id');
    const isMount = React.useRef(false);

    React.useEffect(() => {
        isMount.current = true
        if (isMount.current) { 
            detail({i: Id.params.Id}) 
        }
          
    }, [])

    return (
    <Fragment>      
          
          <section className="vision-section">
          <div className="container">
          <div className="head-static patter-dash">
          <iframe width="100%" height="415" src="https://www.youtube.com/embed/g59rUQbVlIw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
const mapStateToProps = state => ({
        data: state.content.detail_movie
      });
const mapDispatchToProps = dispatch => ({
         detail: data => dispatch(action.singleContent(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Watch)