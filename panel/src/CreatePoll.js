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

const CreatePoll = (children) => {
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  const [poll, setPoll] = useState({
    basics: {
      question: "",
      variant: "t",
      options: [{ body: "" }, { body: "" }, { body: "" }],
    },
    styles: {
      questionFontFamily: "Work Sans",
      questionFontVariant: "regular",
      questionFontSize: 18,
      questionFontStyle: "normal",
      backgroundColor: "#FEC84B",
      optionBackgroundColor: "#FFFFFF",
      questionColor: "#000000",
      optionTextColor: "#000000",
      optionFontFamily: "Work Sans",
      optionFontVariant: "regular",
      optionFontSize: 16,
      optionFontStyle: "normal",
    },
    structure: "simple",
    token: "",
    showVotes: true,
  });

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
          <div
            style={{ margin: 10 }}
            className={true ? classes.dCreateBtn : classes.createBtn}
          >
            Create Poll
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePoll;
