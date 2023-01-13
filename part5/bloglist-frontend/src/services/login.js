import axios from "axios";
const baseUrl = "/api/login";

const login = async (creditials) => {
  const response = await axios.post(baseUrl, creditials);
  return response.data;
};

export default { login };
