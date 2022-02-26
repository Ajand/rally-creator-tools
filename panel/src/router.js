import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./Signin";
import PollsManager from "./PollsManager";

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/polls-manager" element={<PollsManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
