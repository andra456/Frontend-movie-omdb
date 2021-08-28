import React, { Fragment} from 'react'
import './_index.scss'
import {NavLink} from "react-router-dom";
import { GrClose } from 'react-icons/gr';
import { SiImdb } from 'react-icons/si';

function ModalOverviews(props : any) {
const { show, data, callback } = props;

return (
<Fragment >
    <div className={`modal-overlay ${show?'show':''}`}>
        <div className="modal-movie-card"  >
            <GrClose className="close" onClick={()=> callback(false)} />
            <div className="main-modal row">
                <div className="col-xs-4 col-md-4">
                    <img src={data.Poster} className="poster" />
                </div>
                <div className="col-xs-8 col-md-8">
                    <h1>{data.Title} </h1>
                    <span>{data.Year} <a href={'https://www.imdb.com/title/'+data.imdbID}> <SiImdb/></a></span>
                    <p> Helen is called on to lead a campaign to bwhose superpowers are about to be discovered. </p>
                    <NavLink to={`/watch/${data.imdbID}`}><button className="watch">WATCH MOVIE</button> </NavLink>
                </div>
            </div>
        </div>
    </div>
</Fragment>
)
}

export default ModalOverviews
