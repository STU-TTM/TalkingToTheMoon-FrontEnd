import axios from "axios";
// http://120.24.228.79:8080/swagger-ui.html
const instance = axios.create({
  // baseURL: "http://120.24.228.79:8080",
  // timeout: 10000,
});

const foo = {
  get: instance.get,
  post: instance.post,
};

export default foo;
