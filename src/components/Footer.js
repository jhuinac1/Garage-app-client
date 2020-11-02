import React from 'react'
import "../styles/Footer.css";
export default function Footer() {
    return (
        <footer>
            <div className="footer-name">
                <p>Johnny Huinac  - 2020</p>
                <div className="react-logo-footer"></div>
            </div>
            <div>
                <ul>
                    <li>
                        <a href="https://www.instagram.com/johnny_hp7/"
                            className="fab fa-instagram" target="_blank"></a>
                    </li>
                    <li>
                        <a href="https://github.com/jhuinac1"
                            className="fab fa-github" target="_blank"></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/johnny-huinac-15842b112/"
                            className="fab fa-linkedin-in" target="_blank"></a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
