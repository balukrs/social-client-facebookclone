import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Authlogin from "./auth/authlogin";
import Login from "./auth/login/login";
import Homepage from "./main/homepage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Authlogin} />
        <Route path="/login" component={Login} />
        <Route path="/homepage" component={Homepage} />
      </BrowserRouter>
    </div>
  );
};

export default App;
