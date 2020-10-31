import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PostPage from "./components/PostPage";
import Nav from "./components/nav";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import axios from "axios";
import Dashboard from "./components/usersPage/Dashboard";
import NewPost from "./components/usersPage/NewPost";
import Footer from "./components/Footer";

//more simpler than redux, and comes pre-installed with react
//lets use use state , but not local to a single component but
//local to scope of components, and in this case scope of the whole
//app ...this can be set up as a component, we can put data in here
import UserContext from "./context/userContext";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLogIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // console.log(token);

      //START OF FIRST AXIOS CALL **********
      const res = await axios.post("http://localhost:3001/users/isTokenValid", null,
        {
          headers: { "x-auth-token": token }
        })
      //END OF FIRST AXIOS CALL**********

      // console.log(res.data);
      if (res.data) {
        ///SECOND AXIOS CALL ******
        const res2 = await axios.get("http://localhost:3001/users/info",
          {
            headers: {
              "x-auth-token": token,
            }
          });
        //END OF FIRST AXIOS CALL**********
        console.log(res2);
        setUserData({
          token,
          user: res2.data
        })
      }


      // console.log(tokenResponse.data);
    }
    checkLogIn();

  }, []);


  return (
    <>
      <BrowserRouter>
        {/* anything in here will have access to the value in context
          THIS will be used in the log in and register to update token*/}
        <UserContext.Provider value={{ userData, setUserData }}>
          <Nav />
          <Switch>
            <Route path="/log-in" component={Login} />
            <Route path="/user/dashboard" component={Dashboard} />
            <Route path="/user/newPost" component={NewPost} />
            <Route path="/register" component={Register} />
            <Route path="/post/:id" component={PostPage} />
            <Route exact path="/home" component={Home} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

// *************************************************
///////=========IF AN ERROR COMES WITH THE API CALL THEN
  ///PLUG THIS BACK INTO THE APP USEEFFECT FUNCTION
      // .then((response) => {
      //   console.log(response.data);
      // START OF IF STATEMENT=====
      // if (response.data) {
      //   axios.get("http://localhost:3001/users/info",
      //     {
      //       headers: {
      //         "x-auth-token": token,
      //       }
      //     }).then((secondResponse) => {

      //       console.log(secondResponse.data);
      //       setUserData({
      //         token,
      //         user: secondResponse.data,
      //       })
      //     }).catch((error) => {
      //       console.log(error);
      //     }
      //     );
      // }//END OF IF STATEMENT=====

      // }
      // );
// ****************************************************