import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Main from "./components/Main";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">{token ? <Home /> : <Main />}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
