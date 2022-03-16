import { createUseStyles } from "react-jss";
import GoogleFontLoader from "react-google-font-loader";
import { Container, Row, Col } from "react-grid-system";
import { useMutation, gql } from "@apollo/client";

const useStyles = createUseStyles({
  fullRoot: {
    height: "100vh",
    width: "100vw",
    boxSizing: "border-box",
    padding: "2em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fullSizeContainer: {
    width: "90%",
    maxWidth: "600px",
  },
  errorContainer: {
    fontSize: "1.5em",
  },
  root: {
    border: `3px solid black`,
    padding: "1em",
    borderRadius: 10,
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
  img: {
    width: "100%",
    borderRadius: 10,
    border: "3px solid black",
    boxShadow: "3px 3px black",
    marginBottom: "0.5em",
    //padding: '1em',
  },

  imageOptionsContainer: {
    //padding: "8px",
    marginTop: "1em",
    marginBottom: "1em",
    borderRadius: "8px",
    cursor: "pointer",
  },
  optionImageContainer: {
    boxSizing: "border-box",
    boxShadow: "3px 3px black",
    border: "3px solid black",
    borderRadius: 10,
    marginTop: "1em",
    marginBottom: "1em",
    marginBottom: "1em",
    borderRadius: "8px",
    overflow: "hidden",
  },
  imgWithText: {
    width: "100%",
    //  border: "3px solid black",
    boxSizing: "border-box",
  },
  optionImageText: {
    borderTop: "3px solid black",
    padding: "1em",
    marginTop: "-4px",
  },
});

const VOTE = gql`
  mutation Vote($pollId: ID!, $option: Int!) {
    vote(pollId: $pollId, option: $option)
  }
`;

const PollWidget = ({ poll, fullSize, isVoted, isEligible, refetch }) => {
  const classes = useStyles();

  const [vote] = useMutation(VOTE);

  const textOptions = (votable) => {
    return (
      <div className={classes.optionsContainer}>
        {poll.basics.options
          .filter((op) => op.body)
          .map((op, i) => (
            <div
              style={{
                background: poll.styles.optionBackgroundColor,
                color: poll.styles.optionTextColor,
                fontFamily: poll.styles.optionFontFamily,
                fontWeight: poll.styles?.optionFontVariant,
                fontSize: poll.styles.optionFontSize,
                fontStyle: poll.styles.optionFontStyle,
              }}
              className={classes.optionContainer}
              onClick={() => {
                if (votable) {
                  vote({
                    variables: {
                      pollId: poll._id,
                      option: i,
                    },
                  })
                    .then(() => {
                      refetch();
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
              {op.body}
            </div>
          ))}
      </div>
    );
  };

  const imageOptions = (votable) => {
    return (
      <div className={classes.imageOptionsContainer}>
        {poll.basics.options
          .filter((op) => op.hash)
          .map((op, i) => (
            <img
              className={classes.img}
              src={`https://ipfs.io/ipfs/${op.hash}`}
              key={i}
              onClick={() => {
                if (votable) {
                  vote({
                    variables: {
                      pollId: poll._id,
                      option: i,
                    },
                  })
                    .then(() => {
                      refetch();
                    })
                    .catch((err) => console.log(err));
                }
              }}
            />
          ))}
      </div>
    );
  };

  const textImageOptions = (votable) => {
    return (
      <div className={classes.optionsContainer}>
        {poll.basics.options
          .filter((op) => op.hash)
          .map((op, i) => (
            <div
              style={{ background: i == 0 ? "#17b3e2" : "white" }}
              className={classes.optionImageContainer}
              key={i}
              onClick={() => {
                if (votable) {
                  vote({
                    variables: {
                      pollId: poll._id,
                      option: i,
                    },
                  })
                    .then(() => {
                      refetch();
                    })
                    .catch((err) => console.log(err));
                }
              }}
            >
              <img
                className={classes.imgWithText}
                src={`https://ipfs.io/ipfs/${op.hash}`}
              />
              <div
                className={classes.optionImageText}
                style={{
                  background: poll.styles.optionBackgroundColor,
                  color: poll.styles.optionTextColor,
                  fontFamily: poll.styles.optionFontFamily,
                  fontWeight: poll.styles?.optionFontVariant,
                  fontSize: poll.styles.optionFontSize,
                  fontStyle: poll.styles.optionFontStyle,
                }}
              >
                {op.body}
              </div>
            </div>
          ))}
      </div>
    );
  };

  const renderProper = (votable) => {
    switch (poll.basics.variant) {
      case "t":
        return textOptions(votable); //<div>Hello</div>;
      case "i":
        return imageOptions(votable); //<div>Hello</div>;
      case "ti":
        return textImageOptions(votable); //<div>Hello</div>;
    }
  };

  const fontsSet = new Set([
    poll.styles.questionFontFamily,
    poll.styles.optionFontFamily,
  ]);

  if (fullSize) {
    return (
      <>
        <GoogleFontLoader
          fonts={[...fontsSet].map((font) => ({
            font,
            weights: [poll.questionFontVariant],
          }))}
        />
        <div
          className={classes.fullRoot}
          style={{ backgroundColor: poll.styles.backgroundColor }}
        >
          {!isEligible && (
            <div
              className={classes.errorContainer}
              style={{
                fontFamily: poll.styles.questionFontFamily,
                color: poll.styles.questionColor,
              }}
            >
              You are not eligible for this voting
            </div>
          )}
          {isVoted &&
            (poll.showResult ? null : (
              <div
                className={classes.errorContainer}
                style={{
                  fontFamily: poll.styles.questionFontFamily,
                  color: poll.styles.questionColor,
                }}
              >
                You already have voted for this poll
              </div>
            ))}
          {!isVoted && isEligible && (
            <div className={classes.fullSizeContainer}>
              <div
                style={{
                  fontFamily: poll.styles.questionFontFamily,
                  fontWeight: poll.styles?.questionFontVariant,
                  fontSize: poll.styles.questionFontSize,
                  fontStyle: poll.styles.questionFontStyle,
                  color: poll.styles.questionColor,
                  marginBottom: "2em",
                }}
              >
                {poll.basics.question}
              </div>
              {renderProper(true)}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <GoogleFontLoader
        fonts={[...fontsSet].map((font) => ({
          font,
          weights: [poll.questionFontVariant],
        }))}
      />
      <div
        className={classes.root}
        style={{ backgroundColor: poll.styles.backgroundColor }}
      >
        <Container>
          <div
            style={{
              fontFamily: poll.styles.questionFontFamily,
              fontWeight: poll.styles?.questionFontVariant,
              fontSize: poll.styles.questionFontSize,
              fontStyle: poll.styles.questionFontStyle,
              color: poll.styles.questionColor,
            }}
          >
            {poll.basics.question}
          </div>
          {renderProper(false)}
        </Container>
      </div>
    </>
  );
};

export default PollWidget;
