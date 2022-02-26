import { useState } from "react";
import { createUseStyles } from "react-jss";
import { Row, Col, Container } from "react-grid-system";
import PollBasics from "./components/PollBasics";
import CreatorTabs from "./components/CreatorTabs";

const useStyles = createUseStyles({});

const CreatePoll = (children) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <Container>
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
