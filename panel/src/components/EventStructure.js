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

const EventStructure = ({ ev, setEv }) => {
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

  const title = ev.name;
  const setTitle = (t) => setEv({ ...ev, title: t });

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
                label: ev.token,
                value: ev.token,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventStructure;
