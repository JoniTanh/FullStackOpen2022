const initialState = { filter: "" };

const filterRecuder = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return action.data.filter;
    default:
      return state;
  }
};

export const filter = (filter) => {
  return {
    type: "FILTER",
    data: { filter },
  };
};

export default filterRecuder;
