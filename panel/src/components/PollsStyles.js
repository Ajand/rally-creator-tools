import { createUseStyles } from "react-jss";
import Checkbox from "./Checkbox";
import Select from "react-select";
import googleFonts from "../googleFonts";
import { useState, useEffect } from "react";

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

  const [fontFamily, setFontFamily] = useState("");

  const [fontVariant, setFontVariant] = useState("");

  useEffect(() => {
    setFontVariant("");
  }, [fontFamily]);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <div className={classes.titleRow}>
          <p className={classes.title}>Question Font Family:</p>
        </div>
        <div>
          <Select
            onChange={(e) => setFontFamily(e.value)}
            autoComplete
            options={fontOptions}
            styles={customStyles}
          />
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.titleRow}>
          <p className={classes.title}>Question Font Weight:</p>
        </div>
        <div>
          <Select
            isDisabled={!fontFamily}
            autoComplete
            options={
              fontFamily
                ? googleFonts.items
                    .find((item) => item.family === fontFamily)
                    .variants.map((variant) => ({
                      value: variant,
                      label: variant,
                    }))
                : []
            }
            onChange={(e) => setFontVariant(e.value)}
            styles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default PollStructure;
