import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import axios from "axios";
import ErrorMsg from './ErrorMsg';

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

    const emailVal = (event) => {
        setEmail(event.target.value);
    }
    const passwordVal = (event) => {
        setPassword(event.target.value);
    }
    const passwordCheckVal = (event) => {
        setpasswordCheck(event.target.value);
    }
    const displayNameVal = (event) => {
        setdisplayName(event.target.value);
    }

    const submit = async (event) => {

        event.preventDefault();
        // event.target.reset();

        try {
            const newUser = { email, password, passwordCheck, displayName };
            await axios.post("http://localhost:3001/users/sign-up", newUser)
                .then((response) => {
                    //if not errors then we will succesfully register a new user
                    //so now we can log in the user here
                    axios.post("http://localhost:3001/users/login",
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

    //clearing the error
    const clearErr = () => {
        setError(undefined);
    }

    return (
        <div>
            <h1>REGISTER PAGE</h1>
            {error ? <ErrorMsg message={error} clearError={clearErr} /> : null}
            <form onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" onChange={emailVal} />
                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" onChange={passwordVal} />
                <input type="password" placeholder="Verify password" onChange={passwordCheckVal} />

                <label htmlFor="register-display-name">Display Name</label>
                <input id="register-diplay-name" type="text" onChange={displayNameVal} />

                <input type="submit" value="Register" />

            </form>

        </div>
    )
}
