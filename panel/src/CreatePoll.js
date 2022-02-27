import { useState } from "react";
import { createUseStyles } from "react-jss";
import { Row, Col, Container } from "react-grid-system";
import { useNavigate } from "react-router-dom";

import PollBasics from "./components/PollBasics";
import CreatorTabs from "./components/CreatorTabs";
import PollWidget from "./components/PollWidget";
import PollStructure from "./components/PollStructure";

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

  const [poll, setPoll] = useState({
    basics: {},
    styles: {},
    structure: "simple",
    showVotes: true,
  });

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
          {value === 0 && (
            <div style={{ margin: 10 }}>
              <PollBasics poll={poll} setPoll={setPoll} />
            </div>
          )}
          {value === 1 && (
            <div style={{ margin: 10 }}>
              <PollStructure poll={poll} setPoll={setPoll} />
            </div>
          )}
        </Col>
        <Col md={4}>
          <div style={{ margin: 10 }}>
            <PollWidget
              poll={{
                basics: {
                  variant: "t",
                  question:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                },
                style: {
                  question: {},
                },
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePoll;
