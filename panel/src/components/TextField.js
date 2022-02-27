import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    //,
    position: "relative",
    //marginTop: 20,
  },
  label: {
    fontSize: 20,
    position: "absolute",
    left: 30,
    top: 15,
    transition: "200ms",
    background: 'white'
  },
  fillLabel: {
    left: 30,
    top: -12,
    fontSize: 15,
    background: "white",
    padding: "2px 10px 2px 10px",
    border: `2px solid black`,
    boxShadow: "2px 2px black",
    borderRadius: 20,
  },
  input: {
    width: "100%",
    height: "100%",
    padding: "1em",
    boxSizing: "border-box",
    border: `3px solid black`,
    boxShadow: "4px 4px black",
    borderRadius: 10,
    outline: 'none',
    fontSize: 15,
    paddingLeft: 25,
    marginBottom: '0.5em',
    "&:focus + $label": {
      left: 30,
      top: -12,
      fontSize: 15,
      background: "#FEC84B",
      padding: "2px 10px 2px 10px",
      border: `2px solid black`,
      boxShadow: "2px 2px black",
      borderRadius: 20,
    },
  },
});

const TextField = ({ label, value, onChange, ...rest }) => {
  const classes = useStyles();

  const randomId = `randomId:${Math.floor(Math.random() * 100000)}`;



  return (
    <div className={classes.root}>
      <input
        value={value}
        onChange={onChange}
        className={`${classes.input} `}
        {...rest}
        type="text"
        name={randomId}
        id={randomId}
      />
      <label
        className={`${classes.label} ${value ? classes.fillLabel : ""}`}
        for={randomId}
      >
        {label}
      </label>
    </div>
  );
};

export default TextField;
