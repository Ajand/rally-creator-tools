import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { createUseStyles } from "react-jss";
import BounceLoader from "react-spinners/BounceLoader";

import Signin from "./Signin";
import PollsManager from "./PollsManager";
import CreatePoll from "./CreatePoll";
import OauthHandler from "./OauthHandler";
import Poll from "./Poll";
import PollDetails from "./PollDetails";
import CreateEvent from "./CreateEvent";
import EventDetail from "./EventDetail";
import CodeClaim from './CodeClaim'

const useStyles = createUseStyles({
  loadingContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const ME = gql`
  query Query {
    me {
      id
      createdTimestamp
      username
      rallyNetworkWalletIds
    }
  }
`;

const Router = () => {
  const { data, loading, error } = useQuery(ME, {
    pollInterval: 1000
  });

  const classes = useStyles();

  if (loading)
    return (
      <div className={classes.loadingContainer}>
        <BounceLoader size={100} color="#FEC84B" />
      </div>
    );

  return (
    <BrowserRouter>
      {data.me ? (
        <div>
          <Routes>
            <Route path="/" element={<PollsManager />} />
            <Route path="/oauth/:token" element={<OauthHandler />} />
            <Route path="/create-poll" element={<CreatePoll />} />
            <Route path="/poll-details/:_id" element={<PollDetails />} />
            <Route path="/poll/:_id" element={<Poll />} />
            <Route path="/poll-embed/:_id" element={<Poll />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/event-details/:_id" element={<EventDetail />} />
            <Route path="/event/:_id" element={<CodeClaim />} />
          </Routes>
        </div>
      ) : (
        <div>
          <Routes path="/">
            <Route path="*" element={<Signin />} />
            <Route path="/oauth/:token" element={<OauthHandler />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
};

export default Router;
