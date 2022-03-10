import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./Signin";
import PollsManager from "./PollsManager";
import CreatePoll from './CreatePoll'
import OauthHandler from './OauthHandler'

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/oauth/:token" element={<OauthHandler />} />
          <Route path="/polls-manager" element={<PollsManager />} />
          <Route path="/create-poll" element={<CreatePoll />} />
          <Route path="/poll-details/:_id" element={<PollsManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
