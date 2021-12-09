import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3000/" });
// const instance = axios.create();

const foo = {
  get: instance.get,
  post: instance.post,
};

export default foo;
