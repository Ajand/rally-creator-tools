import { createUseStyles } from "react-jss";
import Checkbox from "./Checkbox";

const useStyles = createUseStyles({
  root: {
    border: `3px solid black`,
    padding: "2em 3em",
    borderRadius: 10,
    background: "white",
    boxShadow: "8px 8px black",
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
});

const PollStructure = ({ poll, setPoll }) => {
  const classes = useStyles();

  const selectedType = poll.structure;
  const setSelectedType = (t) => setPoll({ ...poll, structure: t });

  return (
    <div className={classes.root}>
      <div className={classes.section}>
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
    </div>
  );
};

export default PollStructure;
