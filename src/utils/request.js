import axios from "axios";
import { Message, MessageBox } from "element-ui";

// 1.创建axios实例
const service = axios.create({
  // 公共接口--这里注意后面会讲,url = base url + request url
  baseURL: "http://localhost:5000",
  timeout: 5 * 1000,
});

// 2.请求拦截器request interceptor
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token") !== null) {
      config.headers["Authorization"] = localStorage.getItem("token");
      config.headers["Email"] = localStorage.getItem("email");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息,使用JWT可关闭
service.defaults.withCredentials = false;

service.interceptors.response.use(
  // 接收到响应数据并成功后的一些共有的处理，关闭loading等
  (response) => {
    const res = response.data;
    console.log(res);
    // 如果自定义代码不是200，则将其判断为错误。
    if (res.code !== 200) {
      // Message({
      //   showClose: true,
      //   message: res.message || "Error",
      //   type: "error",
      //   duration: 5 * 1000,
      // });
      return res;
    } else {
      return res;
    }
  },
  (error) => {
    // Message({
    //   showClose: true,
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000,
    // });
    // return Promise.reject(error);
  }
);
export default service;
