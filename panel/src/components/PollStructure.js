import { createUseStyles } from "react-jss";
import Checkbox from "./Checkbox";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

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
    marginBottom: "3em",
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
  const [options, setOptions] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_CREATOR_COIN,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setOptions(
          response.data.map((token) => ({
            label: token.symbol,
            value: token.symbol,
          }))
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const selectedType = poll.structure;
  const setSelectedType = (t) => setPoll({ ...poll, structure: t });

  const showVotes = poll.showVotes;
  const setShowVotes = (t) => setPoll({ ...poll, showVotes: t });

  const setSelectedToken = (e) => setPoll({ ...poll, token: e });

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <div className={classes.section}>
          <div className={classes.titleRow}>
            <p className={classes.title}>Selected Coin:</p>
          </div>
          <div>
            <Select
              onChange={(e) => setSelectedToken(e.value)}
              autoComplete
              options={options}
              styles={customStyles}
              defaultValue={{
                label: poll.token,
                value: poll.token,
              }}
            />
          </div>
        </div>
        <div className={classes.titleRow}>
          <p className={classes.title}>Option Type:</p>
        </div>
        <div
          onClick={() => setSelectedType("simple")}
          className={classes.optionTypeRow}
        >
          <Checkbox checked={selectedType === "simple"} />
          <p className={classes.optionLabel}>Simple Voting</p>
        </div>
        <div
          onClick={() => setSelectedType("token")}
          className={classes.optionTypeRow}
        >
          <Checkbox checked={selectedType === "token"} />
          <p className={classes.optionLabel}>Token Weighted Voting</p>
        </div>
        <div
          onClick={() => setSelectedType("quadratic")}
          className={classes.optionTypeRow}
        >
          <Checkbox checked={selectedType === "quadratic"} />
          <p className={classes.optionLabel}>Quadatic Voting</p>
        </div>
      </div>
      <div>
        <div className={classes.titleRow}>
          <p className={classes.title}>Show Votes:</p>
        </div>
        <div
          onClick={() => setShowVotes(true)}
          className={classes.optionTypeRow}
        >
          <Checkbox checked={showVotes === true} />
          <p className={classes.optionLabel}>Yes</p>
        </div>
        <div
          onClick={() => setShowVotes(false)}
          className={classes.optionTypeRow}
        >
          <Checkbox checked={showVotes === false} />
          <p className={classes.optionLabel}>No</p>
        </div>
      </div>
    </div>
  );
};

export default PollStructure;
