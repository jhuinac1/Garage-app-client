import React, { useContext } from 'react';
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/userContext";
export default function AuthButtons() {
    //when we use the {useContext} we get the values from UserContext.provider component which in this case is value={{userData, setUserData}}
    // here we di-structuring the object
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();
    const goToSignUp = () => {
        history.push("/register");
    }
    const goToLogIn = () => {
        history.push("/log-in");
    }
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        })
        localStorage.setItem("auth-token", "");
        history.push("/home");
    };


    //adding a conditional rendering for the buttons
    return (
        <div>
            {
                userData.user ? <>
                    <Link to="/user/dashboard" >
                        <span className="btn-dashboard">Dashboard</span></Link>
                    <button onClick={logout}> Log Out</button>
                </> :
                    <>
                        <button onClick={goToLogIn} >Log In</button>
                        <button onClick={goToSignUp}>Sign Up</button>
                    </>
            }
        </div>
    )
}
