const Notification = ({ message, hasErrors, type }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`${
        hasErrors || type === "delete"
          ? "error"
          : type === "update"
          ? "update"
          : "success"
      }Message`}
    >
      {message}
    </div>
  );
};

export default Notification;
