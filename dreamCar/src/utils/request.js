/* global toast */

import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import auth from 'utils/auth';
import {
  getStrapiBase,
} from 'utils/helpers';

const STR_API_BASE = getStrapiBase();

// 创建axios实例
const request = axios.create({
  baseURL: `${STR_API_BASE}`, // url = baseURL + request.url
  timeout: 9999, // 请求超时时间
  method: 'GET', // 默认方法
  // responseType: 'JSON', // 数据类型
  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  // proxy: {
  //     host: '127.0.0.1',
  //     port: 9999,
  //     auth: {
  //         username: 'chen',
  //         password: '123456'
  //     }
  // }
});

// request拦截器
request.interceptors.request.use(
  async (config) => {
    // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers.token = await auth.getToken(); // eslint-disable-line
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 *如果您想获取标题或状态等信息
 *请返回 response => response
 */

/**
 *通过自定义代码确定请求状态
 *这只是一个例子
 *您还可以通过HTTP状态代码判断状态。
 */

// response 拦截器
request.interceptors.response.use(
  async (response) => {
    // console.log('response------', response);
    // 如果返回401，403，404状态码，则重置 token，并跳转登录页面
    if (response.status === 401 || response.status === 403 || response.status === 404) {
      /**
       *
       * 跳转登录页面，重置token为空
       *
       * */

      await auth.setToken('');
      return Actions.reset('login');
    }

    // 如果返回的status 为 fail，则提示用户为什么错误，并抛出错误不让其继续
    if (response.data.status === 'fail') {
      toast(response.data.message, '', '', 2500, false);
      throw new Error(response.data.message || response.statusText);
    }

    // 正常返回
    return response.data.message;
  },
  (error) => Promise.reject(error)
);

export { request };
