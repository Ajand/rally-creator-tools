import { createUseStyles } from "react-jss";
import { Row, Col, Container } from "react-grid-system";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import BounceLoader from "react-spinners/BounceLoader";

const useStyles = createUseStyles({
  root: {},
  pollsTable: {},
  actions: {
    display: "flex",
    margin: "2em",
    flexDirection: "row-reverse",
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
  secondaryBtn: {
    border: "3px solid black",
    padding: "0.5em 1em",
    borderRadius: 10,
    background: "#5D38CE",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "200ms",
    display: "flex",
    alignItems: "center",
    fontSize: "1.2em",
    boxShadow: "4px 4px black",
    marginRight: "1em",
    "&:hover": {
      background: "#422bbf",
    },
  },
  tableRoot: {
    background: "white",
    border: "3px solid black",
    borderRadius: 8,
    boxShadow: "4px 4px black",
    width: "100%",
    textAlign: "left",
  },
  tableContainer: {
    margin: "2em",
  },
  item: {
    padding: "0.5em",
    borderRight: "3px solid black",
    borderRadius: 8,
  },
  tableRow: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    borderBottom: "3px solid black",
  },
  row: {
    marginLeft: "0px !important",
    marginRight: "0px !important",
  },
  container: {
    margin: "2em",
  },
  pollContainer: {
    border: `3px solid black`,
    padding: "1.5em",
    borderRadius: 10,
    background: "white",
    boxShadow: "4px 4px black",
    marginBottom: "2em",
  },
  question: {
    fontSize: "1.1em",
  },
  infoRow: {
    marginTop: "1em",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  visitButton: {
    border: "3px solid black",
    padding: "0.5em 1em",
    borderRadius: 10,
    background: "#FC695C",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "200ms",
    display: "flex",
    alignItems: "center",
    fontSize: "1.0em",
    boxShadow: "4px 4px black",
    "&:hover": {
      background: "#f0847e",
    },
  },
  loadingContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const pollObj = {
  _id: "1",
  question:
    "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia",
  type: "image",
  options: 4,
  votes: 100,
  status: "polling",
};

const MY_POLLS = gql`
  query MyPolls {
    myPolls {
      pollString
      creator {
        id
        createdTimestamp
        username
        rallyNetworkWalletIds
      }
      active
      votes
    }
  }
`;

const Panel = (children) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(MY_POLLS);

  if (loading || error)
    return (
      <div className={classes.loadingContainer}>
        <BounceLoader size={100} color="#FEC84B" />
      </div>
    );

  const { myPolls } = data;

  const parsedPolls = myPolls.map((pl) => ({
    ...JSON.parse(pl.pollString),
    creator: pl.creator,
    votes: pl.votes,
  }));


  const renderVariant = (ty) => {
    switch (ty) {
      case "t":
        return "Text";
      case "i":
        return "Image";
      default:
        return "Text + Image";
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.actions}>
        <div
          className={classes.button}
          onClick={() => navigate(`/create-poll`)}
        >
          Create A New Poll
        </div>
        <div
          className={classes.secondaryBtn}
          onClick={() => navigate(`/create-poll`)}
        >
          Create A New Event
        </div>
      </div>
      <div className={classes.container}>
        <Row className={classes.row}>
          <Col md={6}>
            {parsedPolls.map((poll) => (
              <div key={poll._id} className={classes.pollContainer}>
                <div className={classes.question}>{poll.basics.question}</div>
                <div className={classes.infoRow}>
                  <div className={classes.info}>
                    Type: {renderVariant(poll.basics.variant)}
                  </div>
                  <div className={classes.info}>
                    Options: {poll.basics.options.length}
                  </div>
                </div>
                <div className={classes.infoRow}>
                  <div className={classes.info}>Votes: {poll.votes}</div>
                  <div className={classes.info}>
                    Status: {poll.active ? "Active" : "In Active"}
                  </div>
                </div>
                <div className={classes.infoRow}>
                  <div
                    className={classes.visitButton}
                    onClick={() => navigate(`/poll-details/${poll._id}`)}
                  >
                    Visit
                  </div>
                </div>
              </div>
            ))}
          </Col>
          <Col md={6}>
            <div className={classes.pollContainer}>
              <div className={classes.question}>{pollObj.question}</div>
              <div className={classes.infoRow}>
                <div className={classes.info}>Type: {pollObj.type}</div>
                <div className={classes.info}>Options: {pollObj.options}</div>
              </div>
              <div className={classes.infoRow}>
                <div className={classes.info}>Votes: {pollObj.votes}</div>
                <div className={classes.info}>Status: {pollObj.status}</div>
              </div>
              <div className={classes.infoRow}>
                <div
                  className={classes.visitButton}
                  onClick={() => navigate(`/poll-details/${pollObj._id}`)}
                >
                  Visit
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Panel;
