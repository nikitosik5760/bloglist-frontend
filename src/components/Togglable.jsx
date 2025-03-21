import React, { useState } from "react";

export default function Togglable(props) {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };
  if (visible) {
    return (
      <>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </>
    );
  }
  return <button onClick={toggleVisibility}>{props.buttonLabel}</button>;
}
