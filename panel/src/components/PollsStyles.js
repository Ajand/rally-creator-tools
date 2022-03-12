import { createUseStyles } from "react-jss";
import Checkbox from "./Checkbox";
import Select from "react-select";
import googleFonts from "../googleFonts";
import { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import TextField from "./TextField";

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
    marginBottom: "1em",
  },
  title: {
    fontSize: 24,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em",
    justifyContent: "space-between",
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
});

const fontOptions = googleFonts.items.map((item) => ({
  value: item.family,
  label: item.family,
}));

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    border: "3px solid black",
    borderRadius: "8px",
    boxShadow: "4px 4px black",
  }),

  control: (provided) => ({
    ...provided,
    border: "3px solid black",
    borderRadius: "8px",
    boxShadow: "4px 4px black",
    transition: "200ms",
    color: "black",
    "&:hover": {
      border: "3px solid #FC695C",
    },
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "black",
    "&:hover": {
      color: "#FC695C",
    },
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#FC695C",
    },
  }),
};

const PollStructure = ({ poll, setPoll }) => {
  const classes = useStyles();

  const {
    questionFontFamily,
    questionFontVariant,
    questionFontSize,
    questionFontStyle,
    backgroundColor,
    optionBackgroundColor,
    questionColor,
    optionTextColor,
    optionFontFamily,
    optionFontVariant,
    optionFontSize,
    optionFontStyle,
  } = poll.styles;

  const setQuestionFontFamily = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, questionFontFamily: e } });

  const setQuestionFontVariant = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, questionFontVariant: e } });

  const setQuestionFontSize = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, questionFontSize: e } });

  const setQuestionFontStyle = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, questionFontStyle: e } });

  const setBackgroundColor = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, backgroundColor: e } });

  const setOptionBackgroundColor = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, optionBackgroundColor: e } });

  const setQuestionColor = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, questionColor: e } });

  const setOptionTextColor = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, optionTextColor: e } });

  const setOptionsFontFamily = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, optionFontFamily: e } });

  const setOptionsFontVariant = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, optionFontVariant: e } });

  const setOptionsFontSize = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, optionFontSize: e } });

  const setOptionsFontStyle = (e) =>
    setPoll({ ...poll, styles: { ...poll.styles, optionFontStyle: e } });

  return (
    <div className={classes.root}>
      <Row>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Question Font Family:</p>
            </div>
            <div>
              <Select
                onChange={(e) => setQuestionFontFamily(e.value)}
                autoComplete
                options={fontOptions}
                styles={customStyles}
                defaultValue={{
                  label: questionFontFamily,
                  value: questionFontFamily,
                }}
              />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Question Font Weight:</p>
            </div>
            <div>
              <Select
                isDisabled={!questionFontFamily}
                autoComplete
                defaultValue={{
                  label: questionFontVariant,
                  value: questionFontVariant,
                }}
                options={
                  questionFontFamily
                    ? googleFonts.items
                        .find((item) => item.family === questionFontFamily)
                        .variants.map((variant) => ({
                          value: variant,
                          label: variant,
                        }))
                    : []
                }
                onChange={(e) => setQuestionFontVariant(e.value)}
                styles={customStyles}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Question Font Size:</p>
            </div>
            <div>
              <Select
                autoComplete
                defaultValue={{
                  label: questionFontSize,
                  value: questionFontSize,
                }}
                options={Array(99)
                  .fill(0)
                  .map((v, i) => ({ value: i + 1, label: i + 1 }))}
                onChange={(e) => setQuestionFontSize(e.value)}
                styles={customStyles}
              />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Question Font Style:</p>
            </div>
            <div>
              <Select
                autoComplete
                defaultValue={{
                  label: questionFontStyle,
                  value: questionFontStyle,
                }}
                options={[
                  { label: "Normal", value: "normal" },
                  { label: "Italic", value: "italic" },
                ]}
                onChange={(e) => setQuestionFontStyle(e.value)}
                styles={customStyles}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Background Color:</p>
            </div>

            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            ></input>
          </div>
        </Col>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Option BG Color:</p>
            </div>

            <input
              type="color"
              value={optionBackgroundColor}
              onChange={(e) => setOptionBackgroundColor(e.target.value)}
            ></input>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Question Text Color:</p>
            </div>

            <input
              type="color"
              value={questionColor}
              onChange={(e) => setQuestionColor(e.target.value)}
            ></input>
          </div>
        </Col>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Option Text Color:</p>
            </div>

            <input
              type="color"
              value={optionTextColor}
              onChange={(e) => setOptionTextColor(e.target.value)}
            ></input>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Option Font Family:</p>
            </div>
            <div>
              <Select
                onChange={(e) => setOptionsFontFamily(e.value)}
                autoComplete
                options={fontOptions}
                styles={customStyles}
                defaultValue={{
                  label: optionFontFamily,
                  value: optionFontFamily,
                }}
              />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Option Font Weight:</p>
            </div>
            <div>
              <Select
                isDisabled={!questionFontFamily}
                autoComplete
                defaultValue={{
                  label: optionFontVariant,
                  value: optionFontVariant,
                }}
                options={
                  questionFontFamily
                    ? googleFonts.items
                        .find((item) => item.family === questionFontFamily)
                        .variants.map((variant) => ({
                          value: variant,
                          label: variant,
                        }))
                    : []
                }
                onChange={(e) => setOptionsFontVariant(e.value)}
                styles={customStyles}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Option Font Size:</p>
            </div>
            <div>
              <Select
                autoComplete
                defaultValue={{
                  label: optionFontSize,
                  value: optionFontSize,
                }}
                options={Array(99)
                  .fill(0)
                  .map((v, i) => ({ value: i + 1, label: i + 1 }))}
                onChange={(e) => setOptionsFontSize(e.value)}
                styles={customStyles}
              />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className={classes.section}>
            <div className={classes.titleRow}>
              <p className={classes.title}>Option Font Style:</p>
            </div>
            <div>
              <Select
                autoComplete
                defaultValue={{
                  label: optionFontStyle,
                  value: optionFontStyle,
                }}
                options={[
                  { label: "Normal", value: "normal" },
                  { label: "Italic", value: "italic" },
                ]}
                onChange={(e) => setOptionsFontStyle(e.value)}
                styles={customStyles}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PollStructure;
