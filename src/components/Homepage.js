import React from 'react'
import "../styles/Homepage.css";
export default function Homepage() {
    return (
        <div className="main-container homepage-container">
            <div className="welcome-container">
                <img src="https://thumbs.dreamstime.com/z/invitation-flyer-written-garage-sale-cartoon-retro-poster-night-second-things-furniture-near-flat-banner-man-examines-piano-151669483.jpg" alt="garage-sale-img" />

            </div>
            <div className="welcome-text">
                <h1>WELCOME!</h1>
                <p>Look up what your neighbors are trying to sell or get rid of from their garage! Also you can start posting items that you want to sell! </p>
                <a href="/search">Start Searching!</a>
            </div>
        </div>
    )
}
