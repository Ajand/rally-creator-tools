import { useState } from "react";
import { createUseStyles } from "react-jss";
import { Row, Col, Container } from "react-grid-system";
import PollBasics from "./components/PollBasics";
import CreatorTabs from "./components/CreatorTabs";
import { useNavigate } from "react-router-dom";

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
});

const CreatePoll = (children) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className={classes.actions}>
            <div
              className={classes.button}
              onClick={() => navigate(`/polls-manager`)}
            >
              Back
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <div style={{ margin: 10 }}>
            <CreatorTabs value={value} onChange={(v) => setValue(v)} />
          </div>
          <div style={{ margin: 10 }}>
            <PollBasics />
          </div>
        </Col>
        <Col md={4}>
          <div style={{ margin: 10 }}>
            <PollBasics />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePoll;
