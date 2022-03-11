import { useEffect } from "react";
import { useParams } from "react-router-dom";
import apolloClient from "./apolloClient";
import { createUseStyles } from "react-jss";
import BounceLoader from "react-spinners/BounceLoader";

const useStyles = createUseStyles({
  loadingContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const OauthHandler = ({ children }) => {
  const params = useParams();
  const beforeOauthUrl = localStorage.getItem("before-oauth-redirect");
  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem("token", params.token);
    apolloClient.resetStore();
    window.location.replace(beforeOauthUrl);
  }, []);

  return (
    <div className={classes.loadingContainer}>
      <BounceLoader size={100} color="#FEC84B" />
    </div>
  );
};

export default OauthHandler;
