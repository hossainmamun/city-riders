import React, { useContext } from 'react';
import '../../Style.css';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../../App.js';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const history = useHistory();
    const handleLoginBtn = () => {
        history.push('/login')
    }
    return (
        <div>
            <nav className="navigation">
                <Link to="/home" className="brand">city riders</Link>
                <ul>
                    <Link to="/home" className="navi-link">home</Link>
                    <Link to="/destination" className="navi-link">destination</Link>
                    <Link to="/blog" className="navi-link">blog</Link>
                    <Link to="/contact" className="navi-link">contact</Link>
                    {
                        loggedInUser.email ?
                            <div className="header-logSign">
                                <span>{loggedInUser.name}</span>
                                <button className="logSign-btn" onClick={() => setLoggedInUser({})}>signOut</button>
                            </div> :
                            <button className="logSign-btn" onClick={handleLoginBtn}>login</button>
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Header;