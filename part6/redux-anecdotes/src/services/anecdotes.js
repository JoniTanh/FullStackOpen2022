import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};

const createNew = async (content) => {
  const anecObj = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecObj);
  return response.data;
};

export default { getAll, update, createNew };
