import React from "react";
import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Register from "./Register";
import Product from "./Product";
import Subscribe from "./Subscribe";
import Subscriptions from "./Subscriptions";
import MandateSuccess from "./MandateSuccess";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Register />
      </Route>
      <Route path="/product">
        <Product />
      </Route>
      <Route path="/mandate-success">
        <MandateSuccess />
      </Route>
      <Route path="/subscribe">
        <Subscribe />
      </Route>
      <Route path="/subscriptions">
        <Subscriptions />
      </Route>
    </Switch>
  );
}

export default App;
