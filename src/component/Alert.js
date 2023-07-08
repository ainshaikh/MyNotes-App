import React from "react";

const Alert = (props) => {
  return (
    <div>
      <div className="alert alert-info my-2" role="alert">
       {props.message}
      </div>
    </div>
  );
};

export default Alert;
