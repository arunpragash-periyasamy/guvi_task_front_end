import React from "react";
import './DashboardHeader.css';

const DashboardHeader = () =>{
    return(
        <>
        
        <div className="promo_card">
                            <h1>Welcome to GUVI Hiring</h1>
                            <span>Get Codified with our New Features!</span>
                            <a href="https://www.guvi.in/" target="__blank"><button>Learn More</button></a>
                            <img src="https://i.kinja-img.com/gawker-media/image/upload/gd8ljenaeahpn0wslmlz.jpg" className="image--cover" />
                        </div>
        </>
    )
}

export default DashboardHeader;