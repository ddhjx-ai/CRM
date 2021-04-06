import axios from 'axios';
import { getStore, setStore } from '../libs/storage';

let accessToken = getStore('accessToken');

/* 
  自主招标发布
*/
export const getAutoBidList = (params = {}) => {
  return axios({
    method: 'post',
    url: '/osc/zhaobiao/list',
    data: params,
    headers: {
      'accessToken': accessToken
    }
  })
}
// 发布
export const autoBidPublish = (params = {}) => {
  return axios({
    method: 'post',
    url: '/osc/zhaobiao/to_publish',
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      ret = ret.substring(0, ret.length - 1);
      return ret;
    }],
    headers: {
      'accessToken': accessToken,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
}
// 打回
export const autoBidReject = (params = {}) => {
  return axios({
    method: 'post',
    url: '/osc/zhaobiao/to_reject',
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      ret = ret.substring(0, ret.length - 1);
      return ret;
    }],
    headers: {
      'accessToken': accessToken,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
}
// 详情
export const autoBidDetail = (id, params = {}) => {
  return axios({
    method: 'get',
    url: '/osc/zhaobiao/detail/' + id,
    params: params,
    headers: {
      'accessToken': accessToken
    }
  })
}
