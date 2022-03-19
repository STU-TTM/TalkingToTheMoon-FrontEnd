import axios from "axios";

// const instance = axios.create({ baseURL: "http://139.196.97.69:8080/" });
const instance = axios.create({ baseURL: "", timeout: 10000 });

const foo = {
  get: instance.get,
  post: instance.post,
};

export default foo;
