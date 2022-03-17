import { useState } from "react";
import { createUseStyles } from "react-jss";
import { Row, Col, Container } from "react-grid-system";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

import EventStructure from "./components/EventStructure";

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
});

const CREATE_POLL = gql`
  mutation CreatePoll($pollString: String!) {
    createPoll(pollString: $pollString)
  }
`;

const CreateEvent = (children) => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  const [createPoll] = useMutation(CREATE_POLL);

  const [ev, setEv] = useState({
    token: "",
    requiredAmount: 1,
    title: "",
  });

  const canCreate =
    ev.token && ev.title && !isNaN(ev.requiredAmount) && ev.requiredAmount > 0;

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
        <Col md={2}></Col>
        <Col md={8}>
          <div style={{ margin: 10 }}>
            <EventStructure ev={ev} setEv={setEv} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;
