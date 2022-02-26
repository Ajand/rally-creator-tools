import { createUseStyles } from "react-jss";
import GoogleFontLoader from "react-google-font-loader";

const useStyles = createUseStyles({
  root: {
    border: `3px solid black`,
    padding: "1em",
    borderRadius: 10,
    background: "white",
    boxShadow: "8px 8px black",
    marginBottom: "2em",
  },
});

const PollWidget = ({ poll }) => {
  const classes = useStyles();

  const renderProper = () => {
    switch (poll.basics.variant) {
      case "t":
        return null //<div>Hello</div>;
    }
  };

  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, "400i"],
          },
          {
            font: "Roboto Mono",
            weights: [400, 700],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />
      <div className={classes.root}>
        <div  style={{ fontFamily: 'Roboto Mono, monospaced' }}>{poll.basics.question}</div>
        {renderProper()}
      </div>
    </>
  );
};

export default PollWidget;
