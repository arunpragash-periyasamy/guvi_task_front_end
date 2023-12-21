import React from "react";
import './Navbar.css';
import { useAuth } from "../AuthProvider/AuthProvider";

const Navbar = () =>{
    const {logout} = useAuth();
    return(
        <nav>
                    <div className="side_navbar">
                        <span>Main Menu</span>
                        <a href="#" className="active">Dashboard</a>
                        <a href="#">Profile</a>
                        <a href="#" onClick={logout}>Logout</a>
                    </div>
                </nav>
    )
}

export default Navbar;