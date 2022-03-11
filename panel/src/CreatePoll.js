import { useState } from "react";
import { createUseStyles } from "react-jss";
import { Row, Col, Container } from "react-grid-system";
import { useNavigate } from "react-router-dom";

import PollBasics from "./components/PollBasics";
import CreatorTabs from "./components/CreatorTabs";
import PollWidget from "./components/PollWidget";
import PollStructure from "./components/PollStructure";
import PollStyles from "./components/PollsStyles";

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
    basics: {
      question: "",
      variant: "t",
      options: [
        { body: "qweasdasdqweqwe" },
        { body: "q,masdflxmcbc vbc vbc vb wsedfqwer" },
        { body: "q,masdflxmcbc vbc weqwe vb qweq" },
      ],
    },
    styles: {
      questionFontFamily: "Work Sans",
      questionFontVariant: "regular",
      questionFontSize: 18,
      questionFontStyle: "normal",
    },
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
              onClick={() => navigate(`/`)}
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
          {value === 2 && (
            <div style={{ margin: 10 }}>
              <PollStyles poll={poll} setPoll={setPoll} />
            </div>
          )}
        </Col>
        <Col md={4}>
          <div style={{ margin: 10 }}>
            <PollWidget poll={poll} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePoll;
