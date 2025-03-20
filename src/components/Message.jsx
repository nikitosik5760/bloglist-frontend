import React from "react";

export default function Message({ message, status }) {
  return <div className={status}>{message}</div>;
}
