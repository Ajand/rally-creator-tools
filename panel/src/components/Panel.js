import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    border: `2px solid black`,
  },
});

const Panel = (children) => {
  const classes = useStyles();

  return <div className={classes.root}>This is the Panel</div>;
};

export default Panel;
