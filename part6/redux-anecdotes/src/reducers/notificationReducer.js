const initialState = "";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MESSAGE": {
      clearTimeout(state.delay);
      return action.data;
    }
    case "DEL_MESSAGE":
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch({
      type: "MESSAGE",
      data: {
        message,
        delay: setTimeout(() => {
          dispatch(deleteNotification(""));
        }, delay * 1000),
      },
    });
  };
};

export const deleteNotification = () => {
  return {
    type: "DEL_MESSAGE",
  };
};

export default notificationReducer;
