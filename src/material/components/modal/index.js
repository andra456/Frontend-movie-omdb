import React, { Fragment} from 'react'
import './_index.scss'
import {NavLink} from "react-router-dom";
import { ReactComponent as Close} from '../../../static/assets/img/ico/cancel.svg';

function ModalOverviews(props) {
const { show, data, callback } = props;

return (
<Fragment >
    <div className={`modal-overlay ${show?'show':''}`}>
        <div className="modal-movie-card"  >
            <div className="bg" style={{ backgroundImage : `url(${data.Poster})`}}></div>
            <Close className="close" onClick={()=> callback(false)} />
            <div className="main-modal row">
                <div className="col-xs-12 col-md-4">
                    <img src={data.Poster} className="poster" />
                </div>
                <div className="col-xs-12 col-md-8">
                    <h1>The Incredibles 2</h1>
                    <span>92 min</span><span>5 <i className="fas fa-star"></i></span>
                    <p>Helen is called on to lead a campaign to bwhose superpowers are about to be discovered.</p>
                    <NavLink to={`/watch/${data.imdbID}`}><button className="watch">WATCH MOVIE</button> </NavLink>
                </div>
            </div>
        </div>
    </div>
</Fragment>
)
}

export default ModalOverviews
