import React from 'react';
import { useHistory } from "react-router-dom";

export default function AuthButtons() {
    const history = useHistory();
    const goToSignUp = () => {
        history.push("/register");
    }
    const goToLogIn = () => {
        history.push("/log-in");
    }
    return (
        <div>
            <button onClick={goToLogIn} >Log In</button>
            <button onClick={goToSignUp}>Sign Up</button>
        </div>
    )
}
