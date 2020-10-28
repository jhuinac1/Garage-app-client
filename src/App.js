
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PostPage from "./components/PostPage";
import Nav from "./components/nav";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/log-in" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/post/:id" component={PostPage} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
