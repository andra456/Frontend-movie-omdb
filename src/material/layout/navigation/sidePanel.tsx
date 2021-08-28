
import { routeList } from '../../../routers/index';
import { NavLink } from "react-router-dom";
import './_sidepannel.scss';

const SidePanels = () => {
    const menu = routeList.filter(IsMenu => IsMenu.menu === true);
    return (
        <div className={`list-panel`} >
            <ul className="list-gallery">
                {menu.map((e: any, i: number) => (
                    <li key={i}><NavLink to={e.path} activeClassName="selected">{e.icon} <span>{e.text} </span></NavLink></li>
                ))}
            </ul>
        </div>
    )
}

export default SidePanels
