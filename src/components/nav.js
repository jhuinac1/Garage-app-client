import React from "react";
import "../styles/nav.css";

class NavBar extends React.Component {



    render() {

        return (
            <nav className="grid-x align-middle grid-padding-x align-justify ">
                <a href="/home" className="cell small-1 ">HOME</a>
                <ul className="menu expanded cell small-4 ">
                    <li ><a href="#">Log In</a></li>
                    <li><a href="#">Sign Up</a></li>
                </ul>
            </nav>
        )
    }
}


export default NavBar;