import React from "react";

const btnSize = {
  sm: "inline-block btn-sm btn btn-circle btn-outline",
  md: "inline-block btn-md btn btn-circle btn-outline",
  xs: "inline-block btn-xs btn btn-circle btn-outline",
};

const QuestionIcon = ({ buttonSize, onClick }) => {
  const className = btnSize[buttonSize];

  return (
    <button className={className} onClick={onClick}>
      ?
    </button>
  );
};

export default QuestionIcon;
