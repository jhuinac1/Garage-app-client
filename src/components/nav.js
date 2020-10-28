import React from "react";
import "../styles/nav.css";
import AuthButtons from "./auth/AuthButtons";
class NavBar extends React.Component {

    render() {

        return (
            <nav className="grid-x align-middle grid-padding-x align-justify ">
                <a href="/home" className="cell small-1">HOME</a>
                <div className="small-4">
                    <AuthButtons />
                </div>
            </nav>
        )
    }
}


export default NavBar;