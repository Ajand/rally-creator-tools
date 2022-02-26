import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  button: {
    border: "3px solid black",
    padding: "0.5em 1em",
    marginLeft: "1em",
    borderRadius: 10,
    background: "#FEC84B",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "200ms",
    display: "flex",
    alignItems: "center",
    fontSize: "1.5em",
    boxShadow:
      "8px 8px black",
    "&:hover": {
      background: "#e5b444",
    },
  },
  logoRally: {
    marginRight: "0.5em",
  },
});

const Signin = (children) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        
      <div className={classes.button}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="60"
          viewBox="0 0 200 260"
          className={classes.logoRally}
        >
          <g id="prefix__logoT2">
            <g
              id="prefix__Layer_1"
              data-name="Layer 1"
              transform="translate(.001)"
            >
              <path
                id="prefix__Path_1630"
                fill="#941b1f"
                d="M110.54 225.051L.1 161.284V33.77L110.54 97.4z"
                data-name="Path 1630"
                transform="translate(.088 29.733)"
              />
              <path
                id="prefix__Path_1631"
                fill="#d10714"
                d="M58.83 225.051l110.44-63.767V33.77L58.83 97.4z"
                data-name="Path 1631"
                transform="translate(51.798 29.733)"
              />
              <path
                id="prefix__Path_1632"
                fill="#ff4500"
                d="M110.54 127.138L220.98 63.5 110.672 0 .1 63.5z"
                data-name="Path 1632"
                transform="translate(.088)"
              />
              <path
                id="prefix__Path_1633"
                fill="#fff"
                d="M167.192 65.032L93.214 22.27 19.5 64.825v85.11l36.726 21.212v-85.11l36.988-21.344 37.252 21.55z"
                data-name="Path 1633"
                transform="translate(17.169 19.608)"
              />
              <path
                id="prefix__Path_1634"
                fill="#b3b3b3"
                d="M19.54 44.95v85.016l36.707 21.212V66.105z"
                data-name="Path 1634"
                transform="translate(17.204 39.577)"
              />
            </g>
          </g>
        </svg>
        Sigin To Rally
      </div>
    </div>
  );
};

export default Signin;
