import axios from "axios";

const baseUrl = "/api/login";
let token = "";

const loginUser = async (credentials) => {
  const request = await axios.post(baseUrl, credentials);
  return request.data;
};

const setToken = (inputToken) => {
  token = `Bearer ${inputToken}`;
};

const getToken = () => token;

export default { loginUser, setToken, getToken };
