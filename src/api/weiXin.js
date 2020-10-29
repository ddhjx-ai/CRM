
// 企业微信登录
export const weiXinLogin = (data) => {
  return axios({
    method: 'get',
    url: '/osc/toDefaultBrowser',
    params: data,
  }) 
}