import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Home} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/game/:id" component={Detail} /> */}
        {/* <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
