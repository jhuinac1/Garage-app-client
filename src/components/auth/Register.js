import React, { useState, useContext } from 'react';
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import axios from "axios";
import ErrorMsg from './ErrorMsg';

//css
import "../../styles/Register.css";

///we will be using this once the form sends the information
//for a new user and then with the response we use the
//{usecontext} to populate the UserContext.provider values

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setpasswordCheck] = useState();
    const [displayName, setdisplayName] = useState();
    const [error, setError] = useState("");

    //enable the context, we don't need to set data itself.
    const { setUserData } = useContext(UserContext);

    ///now we create a history
    const history = useHistory();

    //clearing the error
    const clearErr = () => {
        setError(undefined);
    }

    const emailVal = (event) => {
        setEmail(event.target.value);
        clearErr();
    }
    const passwordVal = (event) => {
        setPassword(event.target.value);
        clearErr();
    }
    const passwordCheckVal = (event) => {
        setpasswordCheck(event.target.value);
        clearErr();
    }
    const displayNameVal = (event) => {
        setdisplayName(event.target.value);
        clearErr();
    }

    const submit = async (event) => {

        event.preventDefault();
        // event.target.reset();

        try {
            const newUser = { email, password, passwordCheck, displayName };
            await axios.post("https://fp-garage-api.herokuapp.com/users/sign-up", newUser)
                .then((response) => {
                    //if not errors then we will succesfully register a new user
                    //so now we can log in the user here
                    axios.post("https://fp-garage-api.herokuapp.com/users/login",
                        {
                            email: newUser.email,
                            password: newUser.password
                        })
                        .then((response) => {
                            console.log(response.data);
                            //this only set the context
                            setUserData({
                                token: response.data.token,
                                user: response.data.user,
                            })
                            //this updates the local-storage with auth-token
                            //for  later use..
                            localStorage.setItem("auth-token", response.data.token);
                            history.push("/user/dashboard");
                        });
                });
        } catch (err) {
            console.log(err.response.data.msg);
            err.response.data.msg && setError(err.response.data.msg);
        }


    }



    return (
        <div className="register-page main-container">
            <h1>REGISTER</h1>
            {error ? <ErrorMsg message={error} clearError={clearErr} /> : null}
            <form onSubmit={submit}>
                <label htmlFor="register-email" className="register-label"> * Email</label>
                <input id="register-email" type="email" onChange={emailVal} className="register-input" placeholder="user@email.com" />
                <label htmlFor="register-password" className="register-label">* Password</label>
                <input id="register-password" type="password" onChange={passwordVal} className="register-input" placeholder="Password" />
                <input type="password" placeholder="Verify Password" onChange={passwordCheckVal} className="register-input" />

                <label htmlFor="register-display-name" className="register-label">Display Name</label>
                <input id="register-diplay-name" type="text" onChange={displayNameVal} className="register-input" placeholder="user123" />

                <input type="submit" value="Register" />
                <Link to="/log-in"><p > Already have an account? </p></Link>

            </form>

        </div>
    )
}
