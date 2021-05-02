import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Authlogin from "./auth/authlogin";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Authlogin} />
      </BrowserRouter>
    </div>
  );
};

export default App;
