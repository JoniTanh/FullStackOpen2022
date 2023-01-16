import anecdoteService from "../services/anecdotes";

export const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      const { id } = action.data;

      const votedAnecdote = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
    }
    case "NEW": {
      return [...state, action.data];
    }
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdote = (votedAnecdote) => {
  return async (dispatch) => {
    const anecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1,
    };

    const updatedAnecdote = await anecdoteService.update(anecdote);
    const { id } = updatedAnecdote;
    dispatch({
      type: "VOTE",
      data: { id },
    });
  };
};

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const createAnecdote = await anecdoteService.createNew(data);
    dispatch({
      type: "NEW",
      data: createAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;
