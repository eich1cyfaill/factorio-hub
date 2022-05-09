import * as React from 'react'
import '../../style/header.sass'
import {Link} from "react-router-dom";



const Header = () => {
    return (
        <header>
            <div className="header__title">
                <p className="header__title_factorio">Factorio</p><span className="header__title_hub">Hub</span>
            </div>
            <nav className="header__nav">
                <ul className="header__nav_menu">
                    <Link to="recipes"><li className="header__nav_item">Recipes</li></Link>
                    <Link to="routertest"><li className="header__nav_item">RouterTest</li></Link>
                </ul>
            </nav>
        </header>
    );
};

export default Header;