import { createUseStyles } from "react-jss";
import Checkbox from "./components/Checkbox";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import TextField from "./components/TextField";
import AddIcon from "./components/AddIcon";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import DeleteIcon from "./components/DeleteIcon";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "100vh",
    flexDirection: "column",
  },
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
  panel: {
    border: `3px solid black`,
    padding: "2em 3em",
    borderRadius: 10,
    background: "white",
    boxShadow: "8px 8px black",
    marginBottom: "2em",
    maxWidth: "600px",
    width: "90%",
  },
  section: {
    marginBottom: "2em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em",
    justifyContent: "space-between",
  },
  optionTypeRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5em",
    cursor: "pointer",
  },
  optionLabel: {
    marginLeft: "0.5em",
    fontSize: 24,
  },
  createBtn: {
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
  dCreateBtn: {
    border: "3px solid black",
    padding: "0.5em 1em",
    borderRadius: 10,
    background: "#c8c8c8",
    cursor: "not-allowed",
    fontWeight: "bold",
    transition: "200ms",
    fontSize: "1.2em",
    boxShadow: "4px 4px black",

    color: "black",
    textAlign: "center",
  },
  iconBtn: {
    cursor: "pointer",
  },
  iconBtnDisabled: {
    cursor: "not-allowed",
  },
  loadingContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  codeRow: {
    paddingBottom: "1em",
    display: "flex",
    fontSize: "1.2em",
    fontWeight: "bold",
    justifyContent: "space-between",
  },
});

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    border: "3px solid black",
    borderRadius: "8px",
    boxShadow: "4px 4px black",
  }),

  control: (provided) => ({
    ...provided,
    border: "3px solid black",
    borderRadius: "8px",
    boxShadow: "4px 4px black",
    transition: "200ms",
    color: "black",
    "&:hover": {
      border: "3px solid #FC695C",
    },
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "black",
    "&:hover": {
      color: "#FC695C",
    },
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#FC695C",
    },
  }),
};

const ADD_CODE = gql`
  mutation addCode($eventId: String!, $body: String!) {
    addCode(eventId: $eventId, body: $body) {
      _id
      claimed
      claimedBy
      body
    }
  }
`;

const DELETE_CODE = gql`
  mutation deleteCode($codeId: ID!, $eventId: String!) {
    deleteCode(codeId: $codeId, eventId: $eventId)
  }
`;

const EVENT = gql`
  query Event($_id: ID!) {
    event(_id: $_id) {
      _id
      selectedCoin
      amount
      owner
      isClaimable
      title
      codes {
        _id
        claimed
        claimedBy
        body
      }
    }
  }
`;

const EventDetail = () => {
  const classes = useStyles();
  const [body, setBody] = useState("");
  const eventId = useParams()._id;
  const navigate = useNavigate();

  const [addCode] = useMutation(ADD_CODE);
  const [deleteCode] = useMutation(DELETE_CODE);
  const { data, loading, error, refetch } = useQuery(EVENT, {
    variables: { _id: eventId },
    pollInterval: 500,
  });

  if (loading || error)
    return (
      <div className={classes.loadingContainer}>
        <BounceLoader size={100} color="#FEC84B" />
      </div>
    );

  const event = data.event;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{width: '90%'}}>
        <div className={classes.actions}>
          <div className={classes.button} onClick={() => navigate(`/`)}>
            Back
          </div>
        </div>
      </div>

      <div className={classes.root}>
        <div className={classes.panel}>
          {" "}
          <a href={`/event/${eventId}`}>The Code Claim Link</a>
        </div>

        <div className={classes.panel}>
          <div className={classes.section}>
            <div className={classes.section}>
              <div style={{ width: "90%" }}>
                <TextField
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  label="Presale Code"
                />
              </div>

              <div
                className={!!body ? classes.iconBtn : classes.iconBtnDisabled}
                onClick={() => {
                  if (body) {
                    addCode({ variables: { body, eventId } })
                      .then(() => {
                        console.log("???");
                        setBody("");
                        refetch();
                      })
                      .catch((err) => console.log(err));
                  }
                }}
              >
                <AddIcon disabled={!body} />
              </div>
            </div>
          </div>

          <div>
            {event.codes.map((code) => (
              <div key={code._id} className={classes.codeRow}>
                <div
                  style={{
                    textDecoration: code.claimed ? "line-through" : "none",
                  }}
                >
                  {code.body} {code.claimed && "- Already Claimed"}
                </div>
                <div>
                  <div
                    className={
                      !code.claimed ? classes.iconBtn : classes.iconBtnDisabled
                    }
                    onClick={() => {
                      if (!code.claimed) {
                        deleteCode({ variables: { codeId: code._id, eventId } })
                          .then(() => {
                            refetch();
                          })
                          .catch((err) => console.log(err));
                      }
                    }}
                  >
                    <DeleteIcon disabled={code.claimed} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
