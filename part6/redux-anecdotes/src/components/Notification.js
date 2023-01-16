import React from "react";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  const style = {
    padding: 2,
  };
  return <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
