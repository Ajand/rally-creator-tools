import { useEffect } from "react";
import { useParams } from "react-router-dom";
import apolloClient from "./apolloClient";

const OauthHandler = ({ children }) => {
  const params = useParams();
  const beforeOauthUrl = localStorage.getItem("before-oauth-redirect");

  useEffect(() => {
    localStorage.setItem("token", params.token);
    apolloClient.resetStore();
    window.location.replace(beforeOauthUrl);
  }, []);

  return <div>HIiii</div>;
};

export default OauthHandler;
