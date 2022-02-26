const DeleteIcon = ({disabled}) => {
    return (
      <svg height="36" width="36">
        <circle
          cx="18"
          cy="18"
          r="15"
          stroke="black"
          strokeWidth={3}
          fill={disabled ? "#c8c8c8" : "#e7574a"}
        />
        <line
          x1="12"
          y1="12"
          x2="24"
          y2="24"
          stroke="rgb(0,0,0)"
          strokeWidth={3}
        />
        <line
          x1="24"
          y1="12"
          x2="12"
          y2="24"
          stroke="rgb(0,0,0)"
          strokeWidth={3}
        />
      </svg>
    );
  };
  
  export default DeleteIcon
  