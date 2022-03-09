import { createUseStyles } from "react-jss";
import GoogleFontLoader from "react-google-font-loader";

const useStyles = createUseStyles({
  root: {
    border: `3px solid black`,
    padding: "1em",
    borderRadius: 10,
    background: "#FEC84B",
    boxShadow: "8px 8px black",
    marginBottom: "2em",
  },
  optionsContainer: {
    marginTop: "1em",
  },
  optionContainer: {
    padding: "8px",
    border: "2px solid black",
    marginBottom: "1em",
    borderRadius: "8px",
    boxShadow: "3px 3px black",
    cursor: "pointer",
  },
});

const PollWidget = ({ poll }) => {
  const classes = useStyles();

  const textOptions = () => {
    return (
      <div className={classes.optionsContainer}>
        {poll.basics.options.map((op, i) => (
          <div
            style={{ background: i == 0 ? "#17b3e2" : "white" }}
            className={classes.optionContainer}
          >
            {op.body}
          </div>
        ))}
      </div>
    );
  };

  const renderProper = () => {
    switch (poll.basics.variant) {
      case "t":
        return textOptions(); //<div>Hello</div>;
    }
  };

  const fontsSet = new Set([poll.styles.questionFontFamily]);

  console.log(
    [...fontsSet].map((font) => {
      console.log(font);
      return {
        font,
        //  weights: [poll.styles?.questionFontVariant],
      };
    })
  );

  return (
    <>
      <GoogleFontLoader
        fonts={[...fontsSet].map((font) => ({
          font,
          weights: [poll.questionFontVariant],
        }))}
      />
      <div className={classes.root}>
        <div
          style={{
            fontFamily: poll.styles.questionFontFamily,
            fontWeight: poll.styles?.questionFontVariant,
            fontSize: poll.styles.questionFontSize,
            fontStyle: poll.styles.questionFontStyle,
          }}
        >
          {poll.basics.question}
        </div>
        {renderProper()}
      </div>
    </>
  );
};

export default PollWidget;
