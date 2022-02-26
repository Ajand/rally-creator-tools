import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    border: `3px solid black`,
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 10,
    overflow: 'hidden',
    background: 'white'
  },

  midTab: {
    borderLeft: "3px solid black",
    borderRight: "3px solid black",
    width: 'calc(36% - 6px)'
  },
  tab: {
    padding: "0.2em",
    display: "flex",
    justifyContent: "center",
    minWidth: "32%",
    cursor: "pointer",
    fontSize: 25,
    transition: "200ms",
    "&:hover": {
      background: "#cec3f0",
    },
  },
  selectedTab: {
    background: "#5D38CE !important",
    color: 'white',
    "&:hover": {
        background: "#4a2da5 !important",
      },
  },
});

const CreatorTabs = ({ value, onChange = () => {} }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div onClick={() => onChange(2)} className={`${classes.tab} ${value === 2 ? classes.selectedTab: ""}`}>Styles</div>
      <div onClick={() => onChange(1)} className={`${classes.tab} ${classes.midTab} ${value === 1 ? classes.selectedTab: ""}`}>Structure</div>
      <div onClick={() => onChange(0)} className={`${classes.tab} ${value === 0 ? classes.selectedTab: ""}`}>Basics</div>
    </div>
  );
};

export default CreatorTabs;
