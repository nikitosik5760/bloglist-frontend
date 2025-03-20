import axios from "axios";
import loginService from "./login";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const postBlog = async (blogData) => {
  const token = loginService.getToken();
  const request = await axios.post(baseUrl, blogData, {
    headers: {
      Authorization: token,
    },
  });
  return request.data;
};

export default { getAll, postBlog };
