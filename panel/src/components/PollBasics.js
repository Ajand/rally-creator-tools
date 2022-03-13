import { createUseStyles } from "react-jss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile, upload } from "../ipfsUploader";

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
    boxShadow: "8px 8px black",
    marginBottom: "2em",
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
    marginTop: "0.5em",
  },
  optionFormHolder: {
    width: "100%",
    marginLeft: "1em",
  },
  imageOptionContainer: {
    border: `3px solid black`,
    boxShadow: "4px 4px black",
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
    fontSize: "1.1em",
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
  discardBtnDisabled: {
    border: "3px solid black",
    padding: "0.5em 1em",
    marginLeft: "1em",
    borderRadius: 10,
    background: "#c8c8c8",
    color: "#333",
    cursor: "not-allowed",
    color: "white",
    fontWeight: "bold",
    transition: "200ms",
  },
});

const PollBasics = ({ poll, setPoll }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const pollQuestion = poll.basics.question;
  const setPollQuestion = (q) =>
    setPoll({ ...poll, basics: { ...poll.basics, question: q } });

  const selectedType = poll.basics.variant;
  const setSelectedType = (v) =>
    setPoll({ ...poll, basics: { ...poll.basics, variant: v } });

  const options = poll.basics.options;
  const setOptions = (o) =>
    setPoll({
      ...poll,
      basics: { ...poll.basics, options: o },
    });

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
              {option.uploading ? (
                <div className={classes.imageOptionCreatorBody}>
                  <img
                    className={classes.img}
                    src={URL.createObjectURL(option.imageFile)}
                  />
                  <div className={classes.imageOptionCreatorBodyFooter}>
                    <div className={classes.progress}>Uploading</div>
                    <div className={classes.discardBtnDisabled}>Discard</div>
                  </div>
                </div>
              ) : option.hash ? (
                <div className={classes.imageOptionCreatorBody}>
                  <img
                    className={classes.img}
                    src={`https://ipfs.io/ipfs/${option.hash}`}
                  />
                  <div className={classes.imageOptionCreatorBodyFooter}>
                    <div className={classes.progress}></div>
                    <div
                      onClick={() => {
                        setOptions(
                          options.map((op, i) => {
                            if (i !== index) return op;
                            return {
                              ...op,
                              imageFile: null,
                              uploading: false,
                              hash: "",
                            };
                          })
                        );
                      }}
                      className={classes.discardBtn}
                    >
                      Discard
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label for={`image::${index}`} className={classes.addBtn}>
                    Add A Photo
                  </label>

                  <input
                    multiple={false}
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      setOptions(
                        options.map((op, i) => {
                          if (i !== index) return op;
                          return { ...op, imageFile: file, uploading: true };
                        })
                      );

                      uploadFile(file)
                        .then((r) => {
                          setOptions(
                            options.map((op, i) => {
                              if (i !== index) return op;
                              return {
                                ...op,
                                hash: r.value.cid,
                                imageFile: file,
                                uploading: false,
                              };
                            })
                          );
                        })
                        .catch((err) => {
                          setOptions(
                            options.map((op, i) => {
                              if (i !== index) return op;
                              return {
                                ...op,
                                imageFile: null,
                                uploading: false,
                              };
                            })
                          );
                        });
                    }}
                    style={{ display: "none" }}
                    name={`image::${index}`}
                    id={`image::${index}`}
                    type="file"
                  />
                </div>
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
                        return { ...op, body: e.target.value };
                      })
                    )
                  }
                  label={`Option ${index + 1}`}
                />
              </div>
            </div>
            <div className={classes.imageOptionContainer}>
              {option.uploading ? (
                <div className={classes.imageOptionCreatorBody}>
                  <img
                    className={classes.img}
                    src={URL.createObjectURL(option.imageFile)}
                  />
                  <div className={classes.imageOptionCreatorBodyFooter}>
                    <div className={classes.progress}>Uploading</div>
                    <div className={classes.discardBtnDisabled}>Discard</div>
                  </div>
                </div>
              ) : option.hash ? (
                <div className={classes.imageOptionCreatorBody}>
                  <img
                    className={classes.img}
                    src={`https://ipfs.io/ipfs/${option.hash}`}
                  />
                  <div className={classes.imageOptionCreatorBodyFooter}>
                    <div className={classes.progress}></div>
                    <div
                      onClick={() => {
                        setOptions(
                          options.map((op, i) => {
                            if (i !== index) return op;
                            return {
                              ...op,
                              imageFile: null,
                              uploading: false,
                              hash: "",
                            };
                          })
                        );
                      }}
                      className={classes.discardBtn}
                    >
                      Discard
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label for={`image::${index}`} className={classes.addBtn}>
                    Add A Photo
                  </label>

                  <input
                    multiple={false}
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      setOptions(
                        options.map((op, i) => {
                          if (i !== index) return op;
                          return { ...op, imageFile: file, uploading: true };
                        })
                      );

                      uploadFile(file)
                        .then((r) => {
                          setOptions(
                            options.map((op, i) => {
                              if (i !== index) return op;
                              return {
                                ...op,
                                hash: r.value.cid,
                                imageFile: file,
                                uploading: false,
                              };
                            })
                          );
                        })
                        .catch((err) => {
                          setOptions(
                            options.map((op, i) => {
                              if (i !== index) return op;
                              return {
                                ...op,
                                imageFile: null,
                                uploading: false,
                              };
                            })
                          );
                        });
                    }}
                    style={{ display: "none" }}
                    name={`image::${index}`}
                    id={`image::${index}`}
                    type="file"
                  />
                </div>
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
