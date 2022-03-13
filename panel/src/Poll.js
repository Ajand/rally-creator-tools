import PollWidget from "./components/PollWidget";
import { createUseStyles } from "react-jss";
import BounceLoader from "react-spinners/BounceLoader";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const useStyles = createUseStyles({
  loadingContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#5D38CE",
    fontSize: "2em",
    backgroundColor: "#FEC84B",
  },
});

const POLL = gql`
  query Poll($_id: ID!) {
    poll(_id: $_id) {
      pollString
      creator {
        id
        createdTimestamp
        username
        rallyNetworkWalletIds
      }
      active
      isVoted
      isEligible
    }
  }
`;

const Poll = () => {
  const classes = useStyles();
  const { _id } = useParams();

  const { data, loading, error } = useQuery(POLL, {
    variables: { _id },
  });

  if (loading)
    return (
      <div className={classes.loadingContainer}>
        <BounceLoader size={100} color="#FEC84B" />
      </div>
    );

  if (error)
    return (
      <div className={classes.errorContainer}>404! Poll has not found!</div>
    );

  console.log(data.poll.isVoted, data.poll.isEligible, data);

  return (
    <div>
      <PollWidget
        poll={JSON.parse(data.poll.pollString)}
        fullSize
        isEligible={data.poll.isEligible}
        isVoted={data.poll.isVoted}
      />
    </div>
  );
};

export default Poll;
