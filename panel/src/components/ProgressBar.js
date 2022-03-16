import { useState } from "react";
import { createUseStyles } from "react-jss";

const ProgressBar = ({ completed, bgColor, textColor }) => {
  const containerStyles = {
    height: 35,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 1,
    border: `3px solid black`,
    position: "relative",
  };

  const fillerStyles = {
    height: 41,
    width: `${(96 / 100) * completed + 5}%`,
    backgroundColor: bgColor,
    borderRadius: "inherit",
    textAlign: "right",
    border: `3px solid black`,
    boxSizing: "border-box",
    transition: "200ms",
    marginTop: -3,
    marginLeft: -3,
  };

  const labelStyles = {
    color: textColor,
    fontWeight: "bold",
    right: 20,
    display: "inline-block",
    position: "absolute",
    zIndex: 10,
    top: '-1.5em'
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
      <div style={labelStyles}>{`${completed}%`}</div>
    </div>
  );
};

export default ProgressBar;
