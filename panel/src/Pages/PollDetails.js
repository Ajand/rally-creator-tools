import { useState } from "react";
import { createUseStyles } from "react-jss";
import { Row, Col, Container } from "react-grid-system";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, gql, useQuery } from "@apollo/client";
import BounceLoader from "react-spinners/BounceLoader";

import PollWidget from "../components/PollWidget";
import VotesWidget from "../components/VotesWidget";

const useStyles = createUseStyles({
  actions: {
    display: "flex",
    margin: 10,
    flexDirection: "row",
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
  activateBtn: {
    border: "3px solid black",
    padding: "0.5em 1em",
    borderRadius: 10,
    background: "#FC695C",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "200ms",
    fontSize: "1.2em",
    boxShadow: "4px 4px black",
    "&:hover": {
      background: "#E7564A",
    },
    color: "black",
    textAlign: "center",
  },
  deactiveBtn: {
    border: "3px solid black",
    padding: "0.5em 1em",
    borderRadius: 10,
    background: "#7dd2ec",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "200ms",
    fontSize: "1.2em",
    boxShadow: "4px 4px black",
    "&:hover": {
      background: "#49c0e5",
    },
    color: "black",
    textAlign: "center",
  },

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
  votesRoot: {
    border: `3px solid black`,
    // padding: "2em 3em",
    borderRadius: 10,
    background: "white",
    boxShadow: "8px 8px black",
    marginBottom: "2em",
    margin: 10,
    overflow: "hidden",
  },
  metaInfo: {
    border: "3px solid black",
    padding: "0.5em 1em",
    borderRadius: 10,
    background: "#5D38CE",
    color: "white",
  },
  pollLink: {
    color: "white !important",
    textDecoration: "none",
    fontSize: "1.5em",
  },
  embedDiv: {
    marginTop: '2em'
  },
  embedHelp: {},
  codeIframe: {
    whiteSpace: 'normal',
    marginTop: '1em'
  },
});

const ACTIVATE_POLL = gql`
  mutation activatePoll($pollId: ID!) {
    activatePoll(pollId: $pollId)
  }
`;

const DEACTIVE_POLL = gql`
  mutation deactivePoll($pollId: ID!) {
    deactivePoll(pollId: $pollId)
  }
`;

const POLL = gql`
  query Poll($_id: ID!) {
    poll(_id: $_id) {
      _id
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
      votes
      voteWeights {
        option
        amount
      }
    }
  }
`;

const CreatePoll = () => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  const { _id } = useParams();

  const [activatePoll] = useMutation(ACTIVATE_POLL);
  const [deactivePoll] = useMutation(DEACTIVE_POLL);

  const { data, loading, error, refetch } = useQuery(POLL, {
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

  const iframeCode = `<iframe
    src="${`http://localhost:3000/poll-embed/${data.poll._id}`}"
    height="HEIGHT"
    width="WIDTH"
    frameborder="0"
  />`;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className={classes.actions}>
            <div className={classes.button} onClick={() => navigate(`/`)}>
              Back
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <div className={classes.votesRoot}>
            <VotesWidget poll={data.poll} />
          </div>
        </Col>
        <Col md={4}>
          <div style={{ margin: 10 }}>
            <PollWidget poll={JSON.parse(data.poll.pollString)} />
          </div>
          <div
            style={{ margin: 10 }}
            className={
              data.poll.active ? classes.deactiveBtn : classes.activateBtn
            }
            onClick={() => {
              if (data.poll.active) {
                deactivePoll({ variables: { pollId: _id } })
                  .then(() => {
                    refetch();
                  })
                  .catch((err) => console.log(err));
              } else {
                activatePoll({ variables: { pollId: _id } })
                  .then(() => {
                    refetch();
                  })
                  .catch((err) => console.log(err));
              }
            }}
          >
            {data.poll.active ? "Deactive Poll" : "Activate Poll"}
          </div>
          <div style={{ margin: 10, marginTop: 20 }}>
            <div className={classes.metaInfo}>
              <a
                className={classes.pollLink}
                href={`${process.env.REACT_APP_CLIENT}/${data.poll._id}`}
                target="_blank"
              >
                The Poll Link
              </a>

              <div className={classes.embedDiv}>
                <div className={classes.embedHelp}>
                  To Embed the poll in your webpage copy this code in your html
                  file and change the HEIGHT and WIDTH
                </div>
                <div className={classes.codeIframe}>{iframeCode}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePoll;
