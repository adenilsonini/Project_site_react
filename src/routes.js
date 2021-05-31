import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Car_user from "./pages/Cad_user";
import Login from "./pages/Login";
import Teste from "./pages/teste";
import Upload_img from "./pages/Upload_img";
import Upload_teste from "./pages/Upload_teste";
import Home from "./pages/Home";


import { Authenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Authenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute Route path="/cad_user" component={Car_user} />
      <Route Route path="/teste" component={Teste} />
      <Route Route path="/upload_img" component={Upload_img} />
      <Route Route path="/upload_teste" component={Upload_teste} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/app" component={() => <h1>App</h1>} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;