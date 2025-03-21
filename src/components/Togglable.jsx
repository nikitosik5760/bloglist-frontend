import React, { useState } from "react";

export default function Togglable(props) {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };
  if (visible) {
    return (
      <>
        <button onClick={toggleVisibility}>cancel</button>
        {props.children}
      </>
    );
  }
  return <button onClick={toggleVisibility}>{props.buttonLabel}</button>;
}
