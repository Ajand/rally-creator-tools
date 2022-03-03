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
        return null; //<div>Hello</div>;
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
