const AddIcon = ({ disabled }) => {
  return (
    <svg height="38" width="38">
      <circle
        cx="20"
        cy="20"
        r="15"
        stroke="black"
        strokeWidth={3}
        fill="#000"
      />{" "}
      <circle
        cx="18"
        cy="18"
        r="15"
        fill={disabled ? "#c8c8c8" : "#17B3E2"}
        stroke="black"
        strokeWidth={3}
      />
      <line
        x1="10"
        y1="18"
        x2="26"
        y2="18"
        stroke="rgb(0,0,0)"
        strokeWidth={3}
      />
      <line
        x1="18"
        y1="10"
        x2="18"
        y2="26"
        stroke="rgb(0,0,0)"
        strokeWidth={3}
      />
    </svg>
  );
};

export default AddIcon;
