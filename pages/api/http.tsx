/*
    1. base http
         path(base url) headers(config) params
*/

import axios from "axios";
import { getUserToken } from "../../lib/utils/storageUtils";

const BASE_URL = "http://cms.chtoma.com/api";

// 创建axios的实例
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  responseType: "json",
  timeout: 50000,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  // 在发生请求前，判断是否需要添加token
  if (!config.url?.includes("login")) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: "Bearer " + getUserToken(),
      },
    };
  }
  return config;
});

export function httpPost(path: string, data?:Record<string, string | number> ) {
  const url = `${BASE_URL}/${path}`;
  return axiosInstance.post(url, data).then((response) => response.data);
}

export function httpPut(path: string, data: Record<string, string | number>){
  const url = `${BASE_URL}/${path}`;

  return axiosInstance.put(url, data).then((response) => response.data);
}

export function httpGet(path: string, params: Record<string, string | number>) {
  const url = `${BASE_URL}/${path}`;
  // 映射
  const req = Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      return [key, value.toString() as string];
    })
  );
  return axiosInstance
    .get(url, { params: new URLSearchParams(req) })
    .then((response) => response.data);
}

export function httpDelete(path: string) {
  const url = `${BASE_URL}/${path}`;
  return axiosInstance.delete(url).then((response) => response);
}
