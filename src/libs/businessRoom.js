import axios from 'axios';

/* 
    商务室后台请求
*/
// 获取tree数据
export const getCateList = (params) => {
  return axios({
    method: 'get',
    url: `/item/cat/list`,
    params: params
  })
}

// 编辑
export const cateUpdate = (params) => {
  return axios({
    method: 'post',
    url: '/item/cat/update',
    data: params
  })
}

// 删除
export const cateRemove = (id) => {
  return axios({
    method: 'delete',
    url: '/item/cat/del/' + id
  })
}

// 添加
export const cateAdd = (params) => {
  return axios({
    method: 'post',
    url: '/item/cat/add',
    data: params
  })
}

/* 
  商品分类
*/
// 获取列表
export const getProductList = (params) => {
  return axios({
    method: 'get',
    url: '/item/list',
    params: params
  })
}

// 获取总数居
export const getCount = () => {
  return axios({
    method: 'get',
    url: '/item/count'
  })
}

// 发布/下架
export const changeStatus = (params) => {
  return axios({
    method: 'put',
    url: '/item/changestatus',
    data: params
  })
}

// 获取详情
export const getItemById = (id) => {
  return axios({
    method: 'get',
    url: '/item/' + id
  })
}

// 上传图片接口
export const uploadImgUrl = '/item/uploadfile';

// 编辑
export const updateProduct = (id, data) => {
  return axios({
    method: 'post',
    url: '/item/update/' + id,
    data: data
  })
}

// 添加
export const addProduct = (data) => {
  return axios({
    method: 'post',
    url: '/item/add',
    data: data
  })
}

// 删除
export const removeProduct = (ids) => {
  return axios({
    method: 'delete',
    url: '/item/del/' + ids
  })
}

// 搜索
export const searchProduct = (data) => {
  return axios({
    method: 'get',
    url: '/item/search',
    params: data
  })
}

/* 
  订单管理接口
*/
// 获取列表数据
export const getOrderList = (data) => {
  return axios({
    method: 'get',
    url: '/order-manager/list',
    params: data
  })
}

// 获取总条数
export const getOrderCount = () => {
  return axios({
    method: 'get',
    url: '/order-manager/count'
  })
}

// 删除
export const removeOrder = (ids) => {
  return axios({
    method: 'delete',
    url: '/order-manager/del/' + ids
  })
}

// 编辑
export const updateOrder = (id, data) => {
  return axios({
    method: 'put',
    url: '/order-manager/update/' + id,
    data: data
  })
}