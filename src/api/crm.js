import axios from 'axios';
import { getStore, setStore } from '../libs/storage';

let accessToken = getStore('accessToken');
/* crm请求 */
export const getCrmRequest = (url, params = {}) => {
  return axios({
    method: 'get',
    url: '/osc' + url,
    params: params,
    headers: {
      'accessToken': accessToken
    }
  })
}

export const postCrmRequest = (url, params = {}) => {
  return axios({
    method: 'post',
    url: '/osc' + url,
    data: params,
    headers: {
      'accessToken': accessToken
    }
  })
}

export const removeCrm = (url) => {
  return axios({
    method: 'delete',
    url: '/osc' + url,
    headers: {
      'accessToken': accessToken
    }
  })
}

export const deleteCrm = (url, id) => {
  return axios({
    method: 'delete',
    url: '/osc' + url,
    headers: {
      'accessToken': accessToken
    },
  })
}

// PUT
export const putCrmRequest = (url, data={}) => {
  return axios({
    method: 'put',
    url: '/osc' + url,
    headers: {
      'accessToken': accessToken
    },
    data:data
  })
}

// 报告申请删除
export const deleteReport = (url, ids) => {
  return axios({
    method: 'delete',
    url: '/osc' + url,
    headers: {
      'accessToken': accessToken
    },
    params: ids
  })
}

// 导出excel方法
export const exportExcel = (url, data) => {
  return axios({
    method: 'get',
    url: url,
    headers: {
      'accessToken': accessToken
    },
    params: data,
    responseType: 'blob'
  })
}