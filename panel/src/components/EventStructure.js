import { createUseStyles } from "react-jss";
import Checkbox from "./Checkbox";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
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
    marginBottom: "2em",
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

const EventStructure = ({ ev, setEv, canCreate, onCreate }) => {
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

  const token = ev.token;
  const setSelectedToken = (t) => setEv({ ...ev, token: t });

  const amount = ev.amount;
  const setAmount = (t) => setEv({ ...ev, amount: t });

  const title = ev.title;
  const setTitle = (t) => setEv({ ...ev, title: t });

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <div className={classes.section}>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Event Title"
          />
        </div>
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
                label: ev.token,
                value: ev.token,
              }}
            />
          </div>
        </div>
        <div className={classes.section}>
          <TextField
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="Required Amount"
          />
        </div>
      </div>
      <div
        style={{ margin: 10 }}
        className={!canCreate ? classes.dCreateBtn : classes.createBtn}
        onClick={() => {
          if (canCreate) {
            onCreate();
          }
        }}
      >
        Create Event
      </div>
    </div>
  );
};

export default EventStructure;
