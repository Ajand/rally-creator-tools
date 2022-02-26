import { createUseStyles } from "react-jss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col } from "react-grid-system";

import TextField from "./TextField";
import Checkbox from "./Checkbox";
import TextOptions from "./TextOptions";

import AddIcon from "./AddIcon";
import DeleteIcon from "./DeleteIcon";

const useStyles = createUseStyles({
  root: {
    border: `3px solid black`,
    padding: "2em 3em",
    borderRadius: 10,
    background: "white",
  },
  section: {
    marginBottom: "2em",
  },
  title: {
    fontSize: 24,
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
  titleRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em",
    justifyContent: "space-between",
  },
  iconBtn: {
    cursor: "pointer",
  },
  iconBtnDisabled: {
    cursor: "not-allowed",
  },
  optionRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em",
  },
  optionFormHolder: {
    width: "100%",
    marginLeft: "1em",
  },
  imageOptionContainer: {
    border: `3px solid black`,
    boxSizing: "border",
    marginBottom: "1em",
    padding: "1em",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
  },
  addBtn: {
    border: "3px solid black",
    padding: "0.5em 1em",
    marginLeft: "1em",
    borderRadius: 10,
    background: "#FEC84B",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "200ms",
    "&:hover": {
      background: "#e5b444",
    },
  },
  img: {
    width: "100%",
    borderRadius: 10,
    border: "3px solid black",
    //padding: '1em',
    boxSizing: "border-box",
  },
  imageOptionCreatorBody: {
    marginLeft: "1em",
  },
  progress: {
    fontSize: "1.8em",
    fontWeight: "bold",
  },
  imageOptionCreatorBodyFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  discardBtn: {
    border: "3px solid black",
    padding: "0.5em 1em",
    marginLeft: "1em",
    borderRadius: 10,
    background: "#C32B75",
    cursor: "pointer",
    color: "white",
    fontWeight: "bold",
    transition: "200ms",
    "&:hover": {
      background: "#b02769",
    },
  },
});

const PollBasics = (children) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [pollQuestion, setPollQuestion] = useState("");

  const [selectedType, setSelectedType] = useState("t");

  const [options, setOptions] = useState([
    {
      body: "qweas",
      image:
        "https://ipfs.io/ipfs/Qmf3N83qEuvBFCqPsT55eEe4XhAzcfbo3csJZP1pQoK3gq",
    },
    { body: "", image: "" },
  ]);

  console.log(options);

  const renderTextOptionCreator = () => {
    return (
      <div>
        {" "}
        {options.map((option, index) => (
          <div className={classes.optionRow}>
            <div
              className={
                options.length > 2 ? classes.iconBtn : classes.iconBtnDisabled
              }
              onClick={() => {
                if (options.length > 2) {
                  setOptions(options.filter((o, i) => i !== index));
                }
              }}
            >
              <DeleteIcon disabled={options.length < 3} />
            </div>
            <div className={classes.optionFormHolder}>
              <TextField
                value={option.body}
                onChange={(e) =>
                  setOptions(
                    options.map((op, i) => {
                      if (i !== index) return op;
                      console.log(e.target.value);
                      return { ...op, body: e.target.value };
                    })
                  )
                }
                label={`Option ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderImageOptionCreator = () => {
    return (
      <Row>
        {options.map((option, index) => (
          <Col md={6}>
            <div className={classes.imageOptionContainer}>
              <div
                className={
                  options.length > 2 ? classes.iconBtn : classes.iconBtnDisabled
                }
                onClick={() => {
                  if (options.length > 2) {
                    setOptions(options.filter((o, i) => i !== index));
                  }
                }}
              >
                <DeleteIcon disabled={options.length < 3} />
              </div>
              {option.image ? (
                <div className={classes.imageOptionCreatorBody}>
                  <img className={classes.img} src={option.image} />
                  <div className={classes.imageOptionCreatorBodyFooter}>
                    <div className={classes.progress}>85%</div>
                    <div className={classes.discardBtn}>Discard</div>
                  </div>
                </div>
              ) : (
                <div className={classes.addBtn}>Add A Photo</div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  const renderTextImageOptionCreator = () => {
    return (
      <Row>
        {options.map((option, index) => (
          <Col md={6}>
            <div className={classes.optionRow}>
              <div
                className={
                  options.length > 2 ? classes.iconBtn : classes.iconBtnDisabled
                }
                onClick={() => {
                  if (options.length > 2) {
                    setOptions(options.filter((o, i) => i !== index));
                  }
                }}
              >
                <DeleteIcon disabled={options.length < 3} />
              </div>
              <div className={classes.optionFormHolder}>
                <TextField
                  value={option.body}
                  onChange={(e) =>
                    setOptions(
                      options.map((op, i) => {
                        if (i !== index) return op;
                        console.log(e.target.value);
                        return { ...op, body: e.target.value };
                      })
                    )
                  }
                  label={`Option ${index + 1}`}
                />
              </div>
            </div>
            <div className={classes.imageOptionContainer}>
              {option.image ? (
                <div className={classes.imageOptionCreatorBody}>
                  <img className={classes.img} src={option.image} />
                  <div className={classes.imageOptionCreatorBodyFooter}>
                    <div className={classes.progress}>85%</div>
                    <div className={classes.discardBtn}>Discard</div>
                  </div>
                </div>
              ) : (
                <div className={classes.addBtn}>Add A Photo</div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  const renderProperOptionCreator = () => {
    switch (selectedType) {
      case "t":
        return renderTextOptionCreator();
      case "i":
        return renderImageOptionCreator();
      case "ti":
        return renderTextImageOptionCreator();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <TextField
          value={pollQuestion}
          onChange={(e) => setPollQuestion(e.target.value)}
          label="Poll Question"
        />
      </div>
      <div className={classes.section}>
        <div className={classes.titleRow}>
          <p className={classes.title}>Option Type:</p>
        </div>
        <div
          onClick={() => setSelectedType("t")}
          className={classes.optionTypeRow}
        >
          <Checkbox checked={selectedType === "t"} />
          <p className={classes.optionLabel}>Text</p>
        </div>
        <div
          onClick={() => setSelectedType("i")}
          className={classes.optionTypeRow}
        >
          <Checkbox checked={selectedType === "i"} />
          <p className={classes.optionLabel}>Image</p>
        </div>
        <div
          onClick={() => setSelectedType("ti")}
          className={classes.optionTypeRow}
        >
          <Checkbox checked={selectedType === "ti"} />
          <p className={classes.optionLabel}>Text + Image</p>
        </div>
      </div>

      <div className={classes.section}>
        <div className={classes.titleRow}>
          <p className={classes.title}>Options:</p>

          <div
            className={
              options.length < 4 ? classes.iconBtn : classes.iconBtnDisabled
            }
            onClick={() => {
              if (options.length < 4) {
                setOptions([...options, { body: "", image: "" }]);
              }
            }}
          >
            <AddIcon disabled={options.length > 3} />
          </div>
        </div>
        {renderProperOptionCreator()}
      </div>
    </div>
  );
};

export default PollBasics;
