/*
 * @fileDesc: Do what
 * @Date: 2021-12-27 18:59:25
 * @LastEditors: white
 * @LastEditTime: 2022-01-10 22:54:58
 * @FilePath: /asset-management-system-pc/src/utils/request.ts
 */

import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import qs from 'qs';
import { showMessage } from "./status";
import { Message } from '@arco-design/web-vue';

export interface HttpResponse<T = unknown> {
  desc: string;
  code: number;
  data: T;
}

// 用于存储pending的请求（处理多条相同请求）
const pendingRequest = new Map()

// 生成request的唯一key
const generateRequestKey = (config = {}) => {
  // 通过url，method，params，data生成唯一key，用于判断是否重复请求
  // params为get请求参数，data为post请求参数
  const { url, method, params, data } : any = config
  return [url, method, qs.stringify(params), qs.stringify(data)].join('&')
}

// 将重复请求添加到pendingRequest中
const addPendingRequest = (config: any) => {
  const key = generateRequestKey(config)
  if (!pendingRequest.has(key)) {
    config.cancelToken = new axios.CancelToken(cancel => {
      pendingRequest.set(key, cancel)
    })
  }
}

// 取消重复请求
const removePendingRequest = (config: any) => {
  const key = generateRequestKey(config)
  if (pendingRequest.has(key)) {
    const cancelToken = pendingRequest.get(key)
    cancelToken(key) // 取消之前发送的请求
    pendingRequest.delete(key)// 请求对象中删除requestKey
  }
}

axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
  transformRequest: [function (data) {
    return qs.stringify(data)
  }]
});

// axios实例拦截响应
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    //浏览器自带的status，和后端约定的是code
    if (response.data.code==200) {
      // 处理重复请求
      removePendingRequest(response)
      addPendingRequest(response)
      return response.data;
    } else {
      showMessage(response.data.code);
      return Promise.reject(response.data);
    }
  },
  // 请求失败
  (error: any) => {
    const {response} = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      Message.warning(showMessage(response.status))
      return Promise.reject(response.data);
    } else {
      Message.warning('网络连接异常,请稍后再试!')
    }
  }
);

// axios实例拦截请求
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 移除重复请求
    removePendingRequest(config)
    return config;
  },
  (error:any) => {
    // 异常情况console，方便排查问题
    console.log('error', error)
    // 移除重复请求
    removePendingRequest(error.config || {})
    return Promise.reject(error);
  }
)
