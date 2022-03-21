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

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $selectedCoin: String!
    $amount: Float!
  ) {
    createEvent(title: $title, selectedCoin: $selectedCoin, amount: $amount) {
      _id
    }
  }
`;

const CreateEvent = (children) => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  const [createEvent] = useMutation(CREATE_EVENT);

  const [ev, setEv] = useState({
    token: "",
    amount: 1,
    title: "",
  });

  const canCreate = ev.token && ev.title && !isNaN(ev.amount) && ev.amount > 0;

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
            <EventStructure
              ev={ev}
              setEv={setEv}
              canCreate={canCreate}
              onCreate={() => {
                console.log({
                  title: ev.title,
                  selectedCoin: ev.token,
                  amount: parseFloat(ev.amount),
                });
                createEvent({
                  variables: {
                    title: ev.title,
                    selectedCoin: ev.token,
                    amount: parseFloat(ev.amount),
                  },
                })
                  .then((r) =>
                    navigate(`/event-details/${r.data.createEvent._id}`)
                  )
                  .catch((err) => console.log(err));
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;
