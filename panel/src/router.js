import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./Signin";

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Signin />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
