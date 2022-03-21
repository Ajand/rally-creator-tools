import { createUseStyles } from "react-jss";
import { useMutation, gql, useQuery } from "@apollo/client";
import BounceLoader from "react-spinners/BounceLoader";
import { useParams, useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  actions: {
    display: "flex",
    margin: 10,
    flexDirection: "row",
  },
  loadingContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5em",
  },
  button: {
    border: "3px solid black",
    padding: "0.5em 1em",
    borderRadius: 10,
    background: "#FEC84B",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "200ms",
    display: "flex",
    alignItems: "center",
    fontSize: "1.2em",
    boxShadow: "4px 4px black",
    "&:hover": {
      background: "#e5b444",
    },
  },
});

const EVENT = gql`
  query Event($_id: ID!) {
    event(_id: $_id) {
      _id
      selectedCoin
      amount
      owner
      isClaimable
      title
      isClaimed {
        _id
        claimed
        claimedBy
        body
      }
      isEligible
    }
  }
`;

const CLAIM = gql`
  mutation claim($eventId: String!) {
    claim(eventId: $eventId)
  }
`;

const CodeClaim = () => {
  const classes = useStyles();

  const eventId = useParams()._id;

  const { data, loading, error, refetch } = useQuery(EVENT, {
    variables: { _id: eventId },
    //pollInterval: 2000,
  });

  const [claim] = useMutation(CLAIM);

  if (loading || error)
    return (
      <div className={classes.loadingContainer}>
        <BounceLoader size={100} color="#FEC84B" />
      </div>
    );

  const ev = data.event;

  console.log(ev);

  if (!ev.isClaimable)
    return (
      <div className={classes.infoContainer}>
        There is no presale code available on this event.
      </div>
    );

  if (!ev.isEligible)
    return (
      <div className={classes.infoContainer}>
        You don't have enough creator coins to claim presale code.
      </div>
    );

  if (ev.isClaimed)
    return (
      <div className={classes.infoContainer}>
        Your claimed code is: {ev.isClaimed.body}
      </div>
    );

  return (
    <div className={classes.infoContainer}>
      <div
        className={classes.button}
        onClick={() => {
          claim({ variables: { eventId } })
            .then(() => {
              refetch();
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        CLAIM PRESALE CODE
      </div>{" "}
    </div>
  );
};

export default CodeClaim;
