
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PostPage from "./components/PostPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/post/:id" component={PostPage} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
