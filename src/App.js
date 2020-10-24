
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PostList from "./components/postList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/posts" component={PostList} />

        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
