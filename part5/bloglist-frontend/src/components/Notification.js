import React from "react";

const Notification = ({ message, hasErrors, type }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`${
        hasErrors || type === "delete" ? "error" : "success"
      }Message`}
    >
      {message}
    </div>
  );
};

export default Notification;
