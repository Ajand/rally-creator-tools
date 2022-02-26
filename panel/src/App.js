import { useState } from "react";
import "./App.css";

import { Row, Col, Container } from "react-grid-system";

import Panel from "./components/Panel";
import CreatorTabs from "./components/CreatorTabs";
import TextField from "./components/TextField";
import Checkbox from "./components/Checkbox";
import PollBasics from "./components/PollBasics";

const App = ({ label }) => {
  const [value, setValue] = useState(0);

  const [question, setQuestion] = useState("");

  const [isChecked, setIsChecked] = useState(false);

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

export default App;
