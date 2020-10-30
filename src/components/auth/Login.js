import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import axios from "axios";
import ErrorMsg from "./ErrorMsg";



export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
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

    const submit = async (event) => {
        event.preventDefault();
        // event.target.reset()

        try {
            const loginUser = { email, password };
            //so now we can log in the user here
            await axios.post("http://localhost:3001/users/login",
                {
                    email: loginUser.email,
                    password: loginUser.password
                })
                .then((response) => {
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
        <div className="log-in-page">
            <h1>LOG IN PAGE</h1>
            {error ? <ErrorMsg message={error} clearError={clearErr} /> : null}
            <form onSubmit={submit}>
                <label htmlFor="Login-email">Email</label>
                <input id="Login-email" type="email" onChange={emailVal} />
                <label htmlFor="Login-password">Password</label>
                <input id="Login-password" type="password" onChange={passwordVal} />

                <input type="submit" value="Login" />

            </form>
        </div>
    )
}
