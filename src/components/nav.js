import React from "react";
import "../styles/nav.css";
import AuthButtons from "./auth/AuthButtons";
import { Link } from "react-router-dom";
class NavBar extends React.Component {

    render() {

        return (
            <nav >
                <Link to="/home" className="fas fa-home"></Link>
                <div className="auth-buttons">
                    <AuthButtons />
                </div>
            </nav>
        )
    }
}


export default NavBar;