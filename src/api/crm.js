import axios from 'axios'; 

/* crm请求 */
export const getCrmRequest = (url, params={}) => {
  return axios({
      method: 'get',
      url: '/osc' + url,
      params: params
  })
}

export const postCrmRequest = (url, params={}) => {
  return axios({
      method: 'post',
      url: '/osc' + url,
      data: params
  })
}

export const removeCrm = (url, params={}) => {
  return axios({
      method: 'post',
      url: '/osc' + url,
      data: params
  })
}