import { useState } from "react";
import { createUseStyles } from "react-jss";

import ProgressBar from "./ProgressBar";

const useStyles = createUseStyles({});

const VotesWidget = ({ poll }) => {
  const classes = useStyles();
  const parsedPoll = JSON.parse(poll.pollString);


  console.log(poll.voteWeights);

  const total = poll.voteWeights
    ? poll.voteWeights.reduce((pV, cV) => pV + cV.amount, 0)
    : 0;


    console.log(poll.voteWeights);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: parsedPoll.styles.backgroundColor,
        padding: "2em 3em",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          color: parsedPoll.styles.questionColor,
          fontFamily: parsedPoll.styles.questionFontFamily,
          fontSize: parsedPoll.styles.questionFontSize,
          fontStyle: parsedPoll.styles.questionFontVariant,
          marginBottom: "2em",
        }}
      >
        There are {poll.votes} votes on this poll
      </div>
      {parsedPoll.basics.options.map((op, i) =>
        op.body ? (
          <div style={{ marginBottom: "1em" }}>
            <div
              style={{
                color: parsedPoll.styles.questionColor,
                fontFamily: parsedPoll.styles.questionFontFamily,
                fontSize: parsedPoll.styles.questionFontSize,
                fontStyle: parsedPoll.styles.questionFontVariant,
                marginBottom: "0.25em",
              }}
            >
              {op.body}
            </div>
            <ProgressBar
              completed={
                total === 0
                  ? 0
                  : poll.voteWeights.find((vw) => vw.option == i)
                  ? (parseInt(
                      poll.voteWeights.find((vw) => vw.option == i).amount
                    ) /
                      total) *
                    100
                  : 0
              }
              bgColor={parsedPoll.styles.optionBackgroundColor}
            />
          </div>
        ) : (
          <div style={{ marginBottom: "1em" }}>
            <div
              style={{
                color: parsedPoll.styles.questionColor,
                fontFamily: parsedPoll.styles.questionFontFamily,
                fontSize: parsedPoll.styles.questionFontSize,
                fontStyle: parsedPoll.styles.questionFontVariant,
                marginBottom: "0.25em",
              }}
            >
              <img height={100} src={`https://ipfs.io/ipfs/${op.hash}`} />
            </div>
            <ProgressBar
              completed={
                total === 0
                  ? 0
                  : poll.voteWeights.find((vw) => vw.option == i)
                  ? (parseInt(
                      poll.voteWeights.find((vw) => vw.option == i).amount
                    ) /
                      total) *
                    100
                  : 0
              }
              bgColor={parsedPoll.styles.optionBackgroundColor}
            />
          </div>
        )
      )}
    </div>
  );
};

export default VotesWidget;
