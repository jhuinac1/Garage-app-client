import React from "react";
import "../styles/nav.css";

class NavBar extends React.Component {



    render() {

        return (
            <nav className="grid-x align-middle grid-padding-x align-justify ">
                <a href="/home" className="cell small-1">HOME</a>
                <div className="small-4">
                    <button >Log In</button>
                    <button>Sign Up</button>
                </div>
            </nav>
        )
    }
}


export default NavBar;