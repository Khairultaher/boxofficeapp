// import logo from './logo.svg';
import React from "react";
import { Switch, Route } from "react-router-dom";
import Navs from "./components/Navs";

function App() {
  return (
    <div>
      <Navs />

      <Switch>
        <Route exact path="/">
          This is home page !!
        </Route>
        <Route path="/starred">This is home page !! </Route>
        <Route>404 ! page not found!!</Route>
      </Switch>
    </div>
  );
}

export default App;
