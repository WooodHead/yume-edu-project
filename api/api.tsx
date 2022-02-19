/*
   封装axios
   函数返回值是promise对象
   1. 统一处理请求异常
        在外面包一个自己创建的promise对象
        在请求出错时，不reject(err), 而是alter错误提示
*/

import axios from "axios";
import { message } from "antd";

const baseUrl = "http://cms.chtoma.com/api";

export default function ajax(
  url: string,
  method: string,
  data?: object,
  headers?: object
) {
  return new Promise((resolve) => {
    let promise;

    if (method === "GET") {
      promise = axios.get(baseUrl + url, headers);
    } else if (method === "POST") {
      promise = axios.post(baseUrl + url, data, headers);
    } else if (method === "DELETE") {
      promise = axios.delete(baseUrl + url, headers);
    } else {
      promise = axios.put(baseUrl + url, data, headers);
    }

    promise
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        message.error("something wrong", err.message);
      });
  });
}
