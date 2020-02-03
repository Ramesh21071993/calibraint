import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;