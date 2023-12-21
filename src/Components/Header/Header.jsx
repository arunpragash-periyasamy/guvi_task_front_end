import React from "react";
import './Header.css';

const Header = () => {
    return(
        
        <header className="header">
        <div className="logo">
            <a href="#">Guvi Task Dashboard</a>

        </div>

        <div className="header-icons">
            <i className="fas fa-bell"></i>
            <div className="account">
                <img src="https://i.kinja-img.com/gawker-media/image/upload/gd8ljenaeahpn0wslmlz.jpg" alt="Profile" />
                <h4>Jhon Viek</h4>
            </div>
        </div>
    </header>
    )
}

export default Header;